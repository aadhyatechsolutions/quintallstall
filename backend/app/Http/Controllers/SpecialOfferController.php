<?php

namespace App\Http\Controllers;

use App\Models\SpecialOffer;
use Illuminate\Http\Request;

class SpecialOfferController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(SpecialOffer::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'second_title' => 'nullable|string|max:255',
            'short_description' => 'nullable|string',
            'image' => 'nullable|image',
            'shop_button_text' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('special_offers', 'public');
        }

        $offer = SpecialOffer::create($validated);

        return response()->json(['message' => 'Offer created successfully', 'data' => $offer]);
    }

    /**
     * Display the specified resource.
     */
    public function show(SpecialOffer $specialOffer)
    {
        return response()->json($specialOffer);
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request, SpecialOffer $specialOffer)
    {
        $request->validate([
            'title' => 'sometimes|required|string',
            'second_title' => 'nullable|string',
            'short_description' => 'nullable|string',
            'shop_button_text' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only([
            'title',
            'second_title',
            'short_description',
            'shop_button_text',
        ]);

       
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            if ($image->isValid()) {
                $imagePath = $image->store('special_offers', 'public');
                $specialOffer->image = $imagePath;
            } else {
                return response()->json(['error' => 'Invalid image file'], 400);
            }
        }
        $specialOffer->update($data);

        return response()->json([
            'message' => 'Special offer updated successfully',
            'data' => $specialOffer
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SpecialOffer $specialOffer)
    {
        $specialOffer->delete();
        return response()->json(['message' => 'Special offer deleted successfully'],200);
    }
}
