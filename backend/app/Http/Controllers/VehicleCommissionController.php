<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VehicleCommission;

class VehicleCommissionController extends Controller
{
    public function index()
    {
        return VehicleCommission::with('vehicleType')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vehicle_type_id'   => 'required|exists:vehicle_types,id',
            'v_fare'            => 'required|numeric|min:0',
            'b_fare'            => 'required|numeric|min:0',
        ]);

        $commission = VehicleCommission::create($validated);

        return response()->json([
            'message' => 'Vehicle commission created successfully.',
            'data' => $commission
        ], 201);
    }

    public function show(VehicleCommission $vehicleCommission)
    {
        return $vehicleCommission->load('vehicleType');
    }

    public function update(Request $request, VehicleCommission $vehicleCommission)
    {
        $validated = $request->validate([
            'vehicle_type_id'   => 'sometimes|required|exists:vehicle_types,id',
            'v_fare'            => 'sometimes|required|numeric|min:0',
            'b_fare'            => 'sometimes|required|numeric|min:0',
        ]);

        $vehicleCommission->update($validated);

        return response()->json([
            'message' => 'Vehicle commission updated successfully.',
            'data' => $vehicleCommission
        ]);
    }

    public function destroy(VehicleCommission $vehicleCommission)
    {
        $vehicleCommission->delete();

        return response()->json([
            'message' => 'Vehicle commission deleted successfully.'
        ]);
    }
}
