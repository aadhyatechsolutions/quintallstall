<?php

namespace App\Http\Controllers;

use App\Models\PlatformCommission;
use Illuminate\Http\Request;

class PlatformCommissionController extends Controller
{
    public function storeOrUpdate(Request $request)
    {
        $request->validate([
            'platform_price' => 'required|numeric',
        ]);

        // Find the first (and only) record
        $platformCommission = PlatformCommission::first();

        if ($platformCommission) {
            // Update existing record
            $platformCommission->platform_price = $request->platform_price;
            $platformCommission->save();

            return response()->json([
                'message' => 'Platform commission updated successfully',
                'data' => $platformCommission
            ], 200);
        } else {
            // Create new record
            $platformCommission = PlatformCommission::create([
                'platform_price' => $request->platform_price,
            ]);

            return response()->json([
                'message' => 'Platform commission created successfully',
                'data' => $platformCommission
            ], 201);
        }
    }

    public function index()
    {
        $commission = PlatformCommission::first();
        if (!$commission) {
            return response()->json(null);
        }
        return response()->json($commission);
    }

    public function store(Request $request)
    {
        $request->validate([
            'platform_price' => 'required|numeric',
        ]);

        // Check if a record already exists
        $existing = PlatformCommission::first();

        if ($existing) {
            // Optionally update the existing record instead of creating new
            $existing->update($request->all());
            return response()->json($existing, 200);
        }

        $commission = PlatformCommission::create($request->all());
        return response()->json($commission, 201);
    }

    public function show($id)
    {
        $commission = PlatformCommission::findOrFail($id);
        return response()->json($commission);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'platform_price' => 'required|numeric',
        ]);

        $commission = PlatformCommission::findOrFail($id);
        $commission->update($request->all());

        return response()->json($commission);
    }

    public function destroy($id)
    {
        $commission = PlatformCommission::findOrFail($id);
        $commission->delete();

        return response()->json(null, 204);
    }
}
