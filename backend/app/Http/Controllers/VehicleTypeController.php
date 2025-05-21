<?php
namespace App\Http\Controllers;

use App\Models\VehicleType;
use Illuminate\Http\Request;

class VehicleTypeController extends Controller
{
    public function index()
    {
        return VehicleType::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|string|max:255',
            'loading_capacity' => 'required|numeric|min:0',
        ]);

        return VehicleType::create($request->all());
    }
    public function update(Request $request, VehicleType $vehicleType)
    {
        $request->validate([
            'type' => 'sometimes|required|string|max:255',
            'loading_capacity' => 'sometimes|required|numeric|min:0',
        ]);

        $vehicleType->update($request->all());

        return response()->json([
            'message' => 'Vehicle type updated successfully.',
            'data' => $vehicleType
        ]);
    }

    // Delete a vehicle type
    public function destroy(VehicleType $vehicleType)
    {
        $vehicleType->delete();

        return response()->json([
            'message' => 'Vehicle type deleted successfully.'
        ]);
    }
    public function show(VehicleType $vehicleType)
    {
        return response()->json($vehicleType);
    }
}
