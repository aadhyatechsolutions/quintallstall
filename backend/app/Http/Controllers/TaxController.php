<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tax;

class TaxController extends Controller
{
    public function index()
    {
        $taxes = Tax::all();

        return response()->json([
            'message' => 'Tax records fetched successfully',
            'taxes' => $taxes
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'cgst' => 'required|numeric|min:0',
            'sgst' => 'required|numeric|min:0',
            'igst' => 'required|numeric|min:0',
        ]);

        $tax = Tax::create($request->only('cgst', 'sgst', 'igst'));

        return response()->json([
            'message' => 'Tax created successfully',
            'tax' => $tax
        ], 201);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'cgst' => 'nullable|numeric|min:0',
            'sgst' => 'nullable|numeric|min:0',
            'igst' => 'nullable|numeric|min:0',
        ]);

        $tax = Tax::findOrFail($id);
        $tax->update($request->only('cgst', 'sgst', 'igst'));

        return response()->json([
            'message' => 'Tax updated successfully',
            'tax' => $tax
        ]);
    }
    public function destroy($id)
    {
        $tax = Tax::findOrFail($id);
        $tax->delete();

        return response()->json([
            'message' => 'Tax deleted successfully'
        ]);
    }
}
