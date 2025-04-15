<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    // Get all reviews
    public function index()
    {
        $reviews = Review::with('product')->latest()->get();
        return response()->json(['reviews' => $reviews]);
    }

    // Store a new review
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'comment' => 'required|string',
            'rating' => 'nullable|integer|min:1|max:5',
        ]);

        $review = Review::create($validated);

        return response()->json(['review' => $review, 'message' => 'Review submitted successfully'], 201);
    }

    // Optional: Show reviews for a specific product
    public function show($productId)
    {
        $reviews = Review::where('product_id', $productId)->latest()->get();
        return response()->json(['reviews' => $reviews]);
    }

    // Optional: Delete a review
    public function destroy($id)
    {
        $review = Review::findOrFail($id);
        $review->delete();
        return response()->json([
            'success' => true,
            'message' => 'Review deleted successfully'
        ]);
    }
    public function update(Request $request, $id)
    {
        $review = Review::findOrFail($id); // Find review by ID

        $validated = $request->validate([
            'product_id' => 'nullable|exists:products,id',
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'comment' => 'nullable|string',
            'rating' => 'nullable|integer|min:1|max:5', // Update rating
        ]);

        // Only update fields that are passed in the request
        $review->update(array_filter($validated)); // `array_filter` to ignore null fields

        return response()->json([
            'review' => $review, 
            'success' => true,
            'message' => 'Review updated successfully'
        ]);
    }
}
