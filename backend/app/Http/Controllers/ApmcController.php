<?php

namespace App\Http\Controllers;

use App\Models\Apmc;
use Illuminate\Http\Request;

class ApmcController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'area' => 'required|string|max:255',
            'village' => 'required|string|max:255',
            'taluka' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'pincode' => 'required|string|max:6',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Handle the image upload if provided
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            if ($image->isValid()) {
                $imagePath = $image->store('apmcs', 'public');
                $imageURL = asset('storage/' . $imagePath);
            } else {
                return response()->json(['error' => 'Invalid image file'], 400);
            }
        } else {
            $imageURL = null;
        }

        // Create the new APMC
        $apmc = Apmc::create([
            'name' => $request->name,
            'location' => $request->location,
            'area' => $request->area,
            'village' => $request->village,
            'taluka' => $request->taluka,
            'city' => $request->city,
            'state' => $request->state,
            'pincode' => $request->pincode,
            'image' => $imageURL,
        ]);

        return response()->json(['apmc' => $apmc], 201);
    }

    public function index()
    {
        // Fetch all APMCs
        $apmcs = Apmc::all();
        return response()->json(['apmcs' => $apmcs], 200);
    }

    public function show($id)
    {
        // Fetch a single APMC by its ID
        $apmc = Apmc::findOrFail($id);
        return response()->json(['apmc' => $apmc], 200);
    }

    public function update(Request $request, $id)
    {
        // Find the APMC by ID
        $apmc = Apmc::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'area' => 'required|string|max:255',
            'village' => 'required|string|max:255',
            'taluka' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'pincode' => 'required|string|max:6',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Handle the image upload if provided
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            if ($image->isValid()) {
                $imagePath = $image->store('apmcs', 'public');
                $imageURL = asset('storage/' . $imagePath);
            } else {
                return response()->json(['error' => 'Invalid image file'], 400);
            }
        } else {
            $imageURL = null;
        }

        // Update the APMC with new values
        $apmc->update([
            'name' => $request->name,
            'location' => $request->location,
            'area' => $request->area,
            'village' => $request->village,
            'taluka' => $request->taluka,
            'city' => $request->city,
            'state' => $request->state,
            'pincode' => $request->pincode,
            'image' => $imageURL,
        ]);

        return response()->json(['apmc' => $apmc], 200);
    }

    public function destroy($id)
    {
        // Find the APMC by ID
        $apmc = Apmc::findOrFail($id);

        // Delete the APMC
        $apmc->delete();

        return response()->json(['message' => 'APMC deleted successfully'], 200);
    }
}
