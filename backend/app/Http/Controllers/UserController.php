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
use Tymon\JWTAuth\Facades\JWTAuth;
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
                'shop_number' => 'required|string',
                'bank_account_number' => 'required|string', 
                'routing_number' => 'required|string', 
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
            'routing_number' => Crypt::encryptString($validated['routing_number']),
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
            'vehicle_id' => null,
            'profile_image' => $profileImagePath,
        ]);

        $role = Role::where('slug', $validated['role'])->firstOrFail();
        $user->roles()->attach($role);

        if (in_array($validated['role'], ['wholesaler', 'retailer'])) {
            $user->apmcs()->sync($validated['apmcs'] ?? []);
        }
        
        if ($validated['role'] === 'delivery') {
            $user->vehicles()->create([
                'vehicle_type' => $validated['vehicle']['vehicle_type'] ?? '',
                'vehicle_no' => $validated['vehicle']['vehicle_no'] ?? '',
                'permit_number' => $validated['vehicle']['permit_number'] ?? '',
                'insurance_number' => $validated['vehicle']['insurance_number'] ?? '',
            ]);            
        }        

        DB::commit();

        return response()->json([
            'message' => 'User created successfully',
            'success' => true,
            'user' => $user->load('roles')->load('apmcs')->makeHidden(['password', 'bank_account_number', 'routing_number']),
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
        $roleFilter = $request->query('role');
        
        $users = User::with('roles', 'address', 'bankAccount', 'vehicles', 'apmcs')
            ->when($roleFilter, function ($query) use ($roleFilter) {
                return $query->whereHas('roles', function ($query) use ($roleFilter) {
                    $query->where('slug', $roleFilter);
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
        $user = User::with('roles', 'address', 'bankAccount', 'vehicles', 'apmcs')->findOrFail($id);

        $role = $user->roles->first()->slug;

        if ($role === 'delivery') {            
            $user->load('vehicles');
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
                $validated = $request->validate([
                    'first_name' => 'required|string',
                    'last_name' => 'required|string',
                    'business_name' => 'required|string',
                    'phone_number' => 'required|string|unique:users,phone_number,' . $id,
                    'email' => 'required|email|unique:users,email,' . $id,
                    'password' => 'nullable|min:6|confirmed',
                    'street' => 'required|string',
                    'city' => 'required|string',
                    'state' => 'required|string',
                    'postal_code' => 'required|string',
                    'shop_number' => 'required|string',
                    'bank_account_number' => 'required|string', 
                    'routing_number' => 'required|string', 
                    'ifsc_code' => 'required|string',
                    'account_type' => 'required|string',
                    'branch_name' => 'required|string',
                    'role' => 'required|exists:roles,slug',
                    'vehicle' => 'nullable|array',
                    'apmcs' => 'nullable|array',
                    'apmcs.*' => 'integer|exists:apmcs,id',
                ]);

            $user = User::findOrFail($id);

            if ($request->hasFile('profile_image')) {
                if ($user->profile_image) {
                    Storage::disk('public')->delete($user->profile_image);
                }
                $profileImagePath = $request->file('profile_image')->store('profile_images', 'public');
            }

            $user->address->update([
                'street' => $validated['street'],
                'city' => $validated['city'],
                'state' => $validated['state'],
                'postal_code' => $validated['postal_code'],
                'shop_number' => $validated['shop_number'],
            ]);

            $user->bankAccount->update([
                'account_number' => Crypt::encryptString($validated['bank_account_number']),
                'routing_number' => Crypt::encryptString($validated['routing_number']),
                'ifsc_code' => $validated['ifsc_code'],
                'account_type' => $validated['account_type'],
                'branch_name' => $validated['branch_name'],
            ]);

            $user->update([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'business_name' => $validated['business_name'],
                'phone_number' => $validated['phone_number'],
                'email' => strtolower($validated['email']),
                'password' => $validated['password'] ? Hash::make($validated['password']) : $user->password,
                'profile_image' => $profileImagePath ?: $user->profile_image,
            ]);

            $role = Role::where('slug', $validated['role'])->firstOrFail();
            $user->roles()->sync([$role->id]);

            if (in_array($validated['role'], ['wholesaler', 'retailer'])) {
                $user->apmcs()->sync($validated['apmcs'] ?? []);
            } else {
                $user->apmcs()->sync([]);
            }

            if ($validated['role'] === 'delivery' && isset($validated['vehicle'])) {
                $user->vehicles()->updateOrCreate([], [
                    'vehicle_type' => $validated['vehicle']['vehicle_type'] ?? '',
                    'vehicle_no' => $validated['vehicle']['vehicle_no'] ?? '',
                    'permit_number' => $validated['vehicle']['permit_number'] ?? '',
                    'insurance_number' => $validated['vehicle']['insurance_number'] ?? '',
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'User updated successfully',
                'success' => true,
                'user' => $user->load(['roles', 'apmcs', 'vehicle'])->makeHidden([
                    'password',
                    'bank_account_number',
                    'routing_number',
                ]),
            ], 200);

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
}
