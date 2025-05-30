<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Address;
use App\Models\BankAccount;
use App\Models\Vehicle;
use App\Models\Role;
use App\Models\APMC;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
// use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Register a new user.
     */
    public function store(Request $request)
    {
        $profileImagePath = null;

        DB::beginTransaction();
        try {
            $validated = $request->validate([
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'business_name' => 'required|string',
                'phone_number' => 'required|string|unique:users',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6|confirmed',
                'street' => 'required|string',
                'city' => 'required|string',
                'state' => 'required|string',
                'postal_code' => 'required|string',
                'shop_number' => 'nullable|string',
                'bank_account_number' => 'required|string', 
                'ifsc_code' => 'required|string',
                'account_type' => 'required|string',
                'branch_name' => 'required|string',
                'role' => 'required|exists:roles,slug',
                'apmcs' => 'nullable|array',
                'apmcs.*' => 'integer|exists:apmcs,id',
                'vehicle' => 'nullable|array',
            ]);

            if ($request->hasFile('profile_image')) {
                $profileImagePath = $request->file('profile_image')->store('profile_images', 'public');
            }

        // Create an address for the user
        $address = Address::create([
            'street' => $validated['street'],
            'city' => $validated['city'],
            'state' => $validated['state'],
            'postal_code' => $validated['postal_code'],
            'shop_number' => $validated['shop_number'],
        ]);

        // Create a bank account for the user
        $bankAccount = BankAccount::create([
            'account_number' => Crypt::encryptString($validated['bank_account_number']),
            'ifsc_code' => $validated['ifsc_code'],
            'account_type' => $validated['account_type'],
            'branch_name' => $validated['branch_name']
        ]);

        // Create the user record
        $user = User::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'business_name' => $validated['business_name'],
            'phone_number' => $validated['phone_number'],
            'email' => strtolower($validated['email']),
            'password' => Hash::make($validated['password']),
            'address_id' => $address->id,
            'bank_account_id' => $bankAccount->id,
            'profile_image' => $profileImagePath,
        ]);

        $role = Role::where('slug', $validated['role'])->firstOrFail();
        $user->roles()->attach($role);

        if (in_array($validated['role'], ['wholesaler', 'retailer'])) {
            $user->apmcs()->sync($validated['apmcs'] ?? []);
        }
        
        if ($validated['role'] === 'delivery') {
            $user->vehicles()->create([
                'vehicle_type_id' => $validated['vehicle']['vehicle_type_id'] ?? '',
                'vehicle_no' => $validated['vehicle']['vehicle_no'] ?? '',
                'permit_number' => $validated['vehicle']['permit_number'] ?? '',
                'permit_expiry_date' => $validated['vehicle']['permit_expiry_date'] ?? null,
                'insurance_number' => $validated['vehicle']['insurance_number'] ?? '',
                'insurance_expiry_date' => $validated['vehicle']['insurance_expiry_date'] ?? null,
            ]);            
        }        

        DB::commit();

        return response()->json([
            'message' => 'User created successfully',
            'success' => true,
            'user' => $user->load('roles')->load('apmcs')->makeHidden(['password', 'bank_account_number']),
        ], 201);

        } 
        catch (ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'message' => $e->getMessage(),
                'errors' => $e->errors(),
                'error' => true,
            ], 422);
        }
        catch (\Throwable $th) {
            DB::rollBack();

            Log::error('Store user error: ' . $th->getMessage());

            return response()->json([
                'message' => 'User creation failed: ' . $th->getMessage(),
                'error' => true
            ], 500);
        }
    }
    /**
     * Fetch all users.
     */
    public function index(Request $request)
    {
        $roleFilters = $request->query('roles', []);

        $users = User::with('roles', 'address', 'bankAccount', 'vehicles', 'apmcs')
            ->when(!empty($roleFilters), function ($query) use ($roleFilters) {
                return $query->whereHas('roles', function ($query) use ($roleFilters) {
                    $query->whereIn('slug', $roleFilters);
                });
            })
            ->get();
        
        return response()->json(['users' => $users], 200);
    }

    /**
     * Fetch a specific user by ID.
     */
    public function show($id)
    {
        $user = User::with('roles', 'address', 'bankAccount', 'vehicles','vehicles.vehicleType', 'apmcs')->findOrFail($id);

        $role = $user->roles->first()->slug;

        if ($role === 'delivery') {            
            $user->load('vehicles.vehicleType');
        }

        if (in_array($role, ['wholeseller', 'retailer'])) {    
            $user->load('apmcs');
        }

        return response()->json(['user' => $user], 200);
    }

    /**
     * Update user information.
     */
    public function update(Request $request, $id)
    {
        $profileImagePath = null;

        DB::beginTransaction();
        try {
            // Validate the input data
            $validated = $request->validate([
                'first_name' => 'nullable|string',
                'last_name' => 'nullable|string',
                'business_name' => 'nullable|string',
                'phone_number' => 'nullable|string|unique:users,phone_number,' . $id,
                'email' => 'nullable|email|unique:users,email,' . $id,
                'password' => 'nullable|min:6',
                'current_password' => 'nullable|string', // added current_password validation
                'street' => 'nullable|string',
                'city' => 'nullable|string',
                'state' => 'nullable|string',
                'postal_code' => 'nullable|string',
                'shop_number' => 'nullable|string',
                'bank_account_number' => 'nullable|string',
                'ifsc_code' => 'nullable|string',
                'account_type' => 'nullable|string',
                'branch_name' => 'nullable|string',
                'role' => 'nullable|exists:roles,slug',
                'vehicle' => 'nullable|array',
                'apmcs' => 'nullable|array',
                'apmcs.*' => 'integer|exists:apmcs,id',
            ]);

            $user = User::findOrFail($id);

            // Check if current_password is provided and if it's correct
            if ($request->filled('current_password')) {
                if (!Hash::check($request->input('current_password'), $user->password)) {
                    // If current password doesn't match, return an error response
                    return response()->json([
                        'message' => 'Current password is incorrect.',
                        'error' => true
                    ], 400);
                }
            }

            // Handle profile image upload if present
            if ($request->hasFile('profile_image')) {
                if ($user->profile_image) {
                    Storage::disk('public')->delete($user->profile_image);
                }
                $profileImagePath = $request->file('profile_image')->store('profile_images', 'public');
            }

            // Update the user's address only if related fields are provided
            if (isset($validated['street']) || isset($validated['city']) || isset($validated['state']) || isset($validated['postal_code']) || isset($validated['shop_number'])) {
                $user->address->update([
                    'street' => $validated['street'] ?? $user->address->street,
                    'city' => $validated['city'] ?? $user->address->city,
                    'state' => $validated['state'] ?? $user->address->state,
                    'postal_code' => $validated['postal_code'] ?? $user->address->postal_code,
                    'shop_number' => $validated['shop_number'] ?? $user->address->shop_number,
                ]);
            }

            // Update the user's bank account details only if provided
            if (isset($validated['bank_account_number']) || isset($validated['ifsc_code']) || isset($validated['account_type']) || isset($validated['branch_name'])) {
                $user->bankAccount->update([
                    'account_number' => $validated['bank_account_number'] ? Crypt::encryptString($validated['bank_account_number']) : $user->bankAccount->account_number,
                    'ifsc_code' => $validated['ifsc_code'] ?? $user->bankAccount->ifsc_code,
                    'account_type' => $validated['account_type'] ?? $user->bankAccount->account_type,
                    'branch_name' => $validated['branch_name'] ?? $user->bankAccount->branch_name,
                ]);
            }

            if (isset($validated['password']) && $validated['password']) {
                $user->password = Hash::make($validated['password']);
            }
            if (isset($validated['email']) && $validated['email']) {
                $user->email = Hash::make($validated['email']);
            }
            // Update the user details if provided
            $user->update([
                'first_name' => $validated['first_name'] ?? $user->first_name,
                'last_name' => $validated['last_name'] ?? $user->last_name,
                'business_name' => $validated['business_name'] ?? $user->business_name,
                'phone_number' => $validated['phone_number'] ?? $user->phone_number,
                'password' => $validated['email'] ?? $user->password,
                'email' => $validated['email'] ?? strtolower($user->email),
                'profile_image' => $profileImagePath ?: $user->profile_image,
            ]);

            // Check if password is present and update it
            

            // Update role if provided
            if (isset($validated['role'])) {
                $role = Role::where('slug', $validated['role'])->firstOrFail();
                $user->roles()->sync([$role->id]);

                // Sync APMCs if applicable
                if (in_array($validated['role'], ['wholesaler', 'retailer'])) {
                    $user->apmcs()->sync($validated['apmcs'] ?? []);
                } else {
                    $user->apmcs()->sync([]);
                }

                // Update vehicle info if the user is a delivery role and vehicle details are provided
                if ($validated['role'] === 'delivery' && isset($validated['vehicle'])) {
                    $user->vehicles()->updateOrCreate([], [
                        'vehicle_type' => $validated['vehicle']['vehicle_type'] ?? '',
                        'vehicle_no' => $validated['vehicle']['vehicle_no'] ?? '',
                        'permit_number' => $validated['vehicle']['permit_number'] ?? '',
                        'permit_expiry_date' => $validated['vehicle']['permit_expiry_date'] ?? null,
                        'insurance_number' => $validated['vehicle']['insurance_number'] ?? '',
                        'insurance_expiry_date' => $validated['vehicle']['insurance_expiry_date'] ?? null,
                    ]);
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'User updated successfully',
                'success' => true,
                'user' => $user->load(['roles', 'apmcs', 'vehicles'])->makeHidden([
                    'password',
                    'bank_account_number'
                ]),
            ], 200);

        } catch (ValidationException $e) {
            DB::rollBack();

            return response()->json([
                'message' => $e->getMessage(),
                'errors' => $e->errors(),
                'error' => true,
            ], 422);
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error('Update user error: ' . $th->getMessage());

            return response()->json([
                'message' => 'User update failed: ' . $th->getMessage(),
                'error' => true
            ], 500);
        }
    }


    
    /**
     * Delete a user by ID.
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    public function createStaff(Request $request)
    {
        $profileImagePath = null;

        DB::beginTransaction();
        try {
            $validated = $request->validate([
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'email' => 'required|email|unique:users',
                'phone_number' => 'required|string|unique:users',
                'password' => 'required|min:6|confirmed',
                'profile_image' => 'nullable|image|max:2048',
                'role' => 'required|exists:roles,slug',
            ]);

            if ($request->hasFile('profile_image')) {
                $profileImagePath = $request->file('profile_image')->store('profile_images', 'public');
            }

            $user = User::create([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'email' => strtolower($validated['email']),
                'phone_number' => $validated['phone_number'],
                'password' => Hash::make($validated['password']),
                'profile_image' => $profileImagePath,
            ]);
            $role = Role::where('slug', $validated['role'])->firstOrFail();
            $user->roles()->attach($role);

            DB::commit();

            return response()->json([
                'message' => 'Staff created successfully',
                'success' => true,
                'user' => $user->load('roles')->makeHidden(['password']),
            ], 201);

        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'message' => $e->getMessage(),
                'errors' => $e->errors(),
                'error' => true,
            ], 422);
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error('Create staff error: ' . $th->getMessage());
            return response()->json([
                'message' => 'Staff creation failed: ' . $th->getMessage(),
                'error' => true
            ], 500);
        }
    }
    public function updateStaff(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validate([
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'email' => 'required|email|unique:users,email,' . $id,
                'phone_number' => 'required|string|unique:users,phone_number,' . $id,
                'password' => 'nullable|min:6|confirmed',
                'profile_image' => 'nullable|image|max:2048',
                'role' => 'required|exists:roles,slug',
            ]);

            $user = User::findOrFail($id);

            // Handle profile image update
            if ($request->hasFile('profile_image')) {
                // Optionally delete the old image if it exists
                if ($user->profile_image && Storage::disk('public')->exists($user->profile_image)) {
                    Storage::disk('public')->delete($user->profile_image);
                }

                $user->profile_image = $request->file('profile_image')->store('profile_images', 'public');
            }

            $user->first_name = $validated['first_name'];
            $user->last_name = $validated['last_name'];
            $user->email = strtolower($validated['email']);
            $user->phone_number = $validated['phone_number'];

            if (!empty($validated['password'])) {
                $user->password = Hash::make($validated['password']);
            }

            $user->save();

            DB::commit();

            return response()->json([
                'message' => 'Staff updated successfully',
                'success' => true,
                'user' => $user->load('roles')->makeHidden(['password']),
            ]);

        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'message' => $e->getMessage(),
                'errors' => $e->errors(),
                'error' => true,
            ], 422);
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error('Update staff error: ' . $th->getMessage());
            return response()->json([
                'message' => 'Staff update failed: ' . $th->getMessage(),
                'error' => true,
            ], 500);
        }
    }

}
