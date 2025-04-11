<?php
namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RoleController extends Controller
{
    public function index()
    {
        return response()->json(Role::all());
    }

    public function store(Request $request)
    {
        try{
            $request->validate([
                'name' => 'required|string|max:255|unique:roles,name',
                'slug' => 'required|string|max:255|unique:roles,slug',
                'description' => 'nullable|string|max:1000',
                'permissions' => 'nullable|array',
                'permissions.*' => 'string',
            ]);        
            $role = Role::create([
                'name' => $request->name,
                'slug' => $request->slug,
                'description' => $request->description,
                'permissions' => $request->has('permissions') ? json_encode($request->permissions) : null,
            ]);

            return response()->json([
                'message' => 'Role created successfully',
                'success' => true,
                'role' => $role,
            ], 201);
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'errors' => $e->errors(),
                'error' => true,
            ], 422);

        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Role creation failed: ' . $th->getMessage(),
                'error' => true,
            ], 500);
        }
    }

    public function show($id)
    {
        $role = Role::findOrFail($id);
        return response()->json($role);
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255|unique:roles,name,' . $id,
                'slug' => 'required|string|max:255|unique:roles,slug,' . $id,
                'description' => 'nullable|string|max:1000',
                'permissions' => 'nullable|array',
                'permissions.*' => 'string',
            ]);

            $role = Role::findOrFail($id);

            $role->update([
                'name' => $request->name,
                'slug' => $request->slug,
                'description' => $request->description,
                'permissions' => $request->has('permissions') ? json_encode($request->permissions) : null,
            ]);

            return response()->json([
                'message' => 'Role updated successfully',
                'success' => true,
                'role' => $role,
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'errors' => $e->errors(),
                'error' => true,
            ], 422);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Role update failed: ' . $th->getMessage(),
                'error' => true,
            ], 500);
        }
    }


    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();
        return response()->json(null, 204);
    }
}
