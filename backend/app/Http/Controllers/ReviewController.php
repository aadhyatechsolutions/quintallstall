<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    // Get all reviews
    public function index()
    {
        $reviews = Review::with('product')->latest()->get();
        return response()->json(['reviews' => $reviews]);
    }

    // Store a new review
   // Store a new review
    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $review = Review::create([
            'product_id' => $validated['product_id'],
            'user_id' => $user->id,
            'name' => $user->first_name,
            'email' => $user->email,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
        ]);

        return response()->json([
            'review' => $review,
            'success' => true,
            'message' => 'Review created successfully',
        ]);
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
        $user = Auth::user();
        $review = Review::where('id', $id)->where('user_id', $user->id)->first();

        if (!$review) {
            return response()->json(['message' => 'Review not found or unauthorized'], 404);
        }

        $validated = $request->validate([
            'comment' => 'nullable|string',
            'rating' => 'nullable|integer|min:1|max:5',
        ]);

        $review->update(array_filter($validated));

        return response()->json([
            'review' => $review,
            'success' => true,
            'message' => 'Review updated successfully'
        ]);
    }
}
