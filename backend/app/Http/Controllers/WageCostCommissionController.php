<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WageCostCommission;

class WageCostCommissionController extends Controller
{
    // Get the single WageCostCommission record (or null)
    public function index()
    {
        $record = WageCostCommission::first();

        if ($record) {
            return response()->json($record);
        }

        return response()->json(null, 204); // No content if none
    }

    // Create or update the single WageCostCommission record
    public function store(Request $request)
    {
        $validated = $request->validate([
            'cost' => 'required|numeric|min:0',
            'commission' => 'required|numeric|min:0',
        ]);

        // Get existing record or new instance
        $record = WageCostCommission::first();

        if ($record) {
            $record->update($validated);
            return response()->json($record, 200);
        } else {
            $record = WageCostCommission::create($validated);
            return response()->json($record, 201);
        }
    }

    // Optional: update method if you want to explicitly update by id
    public function update(Request $request, WageCostCommission $wageCostCommission)
    {
        $validated = $request->validate([
            'cost' => 'sometimes|required|numeric|min:0',
            'commission' => 'sometimes|required|numeric|min:0',
        ]);

        $wageCostCommission->update($validated);

        return response()->json([
            'message' => 'Wage cost commission updated successfully.',
            'data' => $wageCostCommission,
        ]);
    }

    // Optional: delete method if you want to delete the record
    public function destroy(WageCostCommission $wageCostCommission)
    {
        $wageCostCommission->delete();

        return response()->json([
            'message' => 'Wage cost commission deleted successfully.'
        ]);
    }
}
