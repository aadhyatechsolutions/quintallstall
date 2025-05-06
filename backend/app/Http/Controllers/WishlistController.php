<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{
    // Show the current user's wishlist
    public function index()
    {
        $user = Auth::user();
        $wishlists = $user->wishlists()->with('product')->get();

        return response()->json([
            'data' => $wishlists,
            'message' => 'Wishlist fetched successfully.'
        ], 200);
    }

    // Add a product to the wishlist
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $user = Auth::user();

        // Check if the product is already in the wishlist
        $existingWishlist = $user->wishlists()->where('product_id', $request->product_id)->first();

        if ($existingWishlist) {
            return response()->json([
                'error' => 'Product already in wishlist.'
            ], 400);
        }

        $wishlist = new Wishlist([
            'user_id' => $user->id,
            'product_id' => $request->product_id,
        ]);
        $wishlist->save();

        // Eager load product data
        $wishlist->load('product');

        return response()->json([
            'data' => $wishlist,
            'message' => 'Product added to wishlist successfully.'
        ], 201);
    }

    // Remove a product from the wishlist
    public function destroy($id)
    {
        $user = Auth::user();
        $wishlist = $user->wishlists()->findOrFail($id);
        $wishlist->delete();

        return response()->json([
            'data' => null,
            'message' => 'Product removed from wishlist successfully.'
        ], 200);
    }

    // Method to fetch wishlists by seller
    public function getBySeller($slug)
    {
        $products = Wishlist::whereHas('product.seller.roles', function ($query) use ($slug) {
            $query->where('slug', $slug);
        })
        ->with([
            'product.category',
            'product.seller' => function($query) {
                $query->select('id', 'first_name');
            },
            'product.seller.roles' => function($query) {
                $query->select('roles.name', 'roles.slug');
            }
        ])
        ->get();

        return response()->json([
            'data' => $products,
            'message' => 'Wishlist products fetched by seller successfully.'
        ], 200);
    }
}
