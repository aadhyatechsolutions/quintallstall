<?php

// app/Http/Controllers/ProductController.php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class ProductController extends Controller
{
    // Method to create a new product
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|numeric|min:0',
            'unit' => 'required|in:kg,gram,quintal',
            'status' => 'required|string|in:active,inactive',
            'category' => 'required|exists:categories,id',
            'user' => 'required|exists:users,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imageURL = null;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            if ($image->isValid()) {
                $imagePath = $image->store('products', 'public');
                $imageURL = asset('storage/' . $imagePath);
            } else {
                return response()->json(['error' => 'Invalid image file'], 400);
            }
        }

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'unit' => $request->unit,
            'status' => $request->status,
            'category_id' => $request->category,
            'user_id' => $request->user,
            'image' => $imageURL,
        ]);

        $product->load(['category', 'user.roles']);

        return response()->json(['product' => $product], 201);
    }


    public function index()
    {
        $products = Product::with([
            'category',
            'user' => function($query) {
                $query->select('id', 'first_name');
            },
            'user.roles' => function($query) {
                $query->select('roles.name', 'roles.slug');
            }
        ])->get();
        
        return response()->json(['products' => $products], 200);
    }
    public function show($id)
    {
        $product = Product::with([
            'category',
            'user' => function($query) {
                $query->select('id', 'first_name');
            },
            'user.roles' => function($query) {
                $query->select('roles.name', 'roles.slug');
            }
        ])->findOrFail($id);

        return response()->json(['product' => $product], 200);
    }
    
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|numeric|min:0',
            'unit' => 'required|in:kg,gram,quintal',
            'status' => 'required|string|in:active,inactive',
            'category' => 'required|exists:categories,id',
            'user' => 'required|exists:users,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Handle image upload if a new one is provided
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            if ($image->isValid()) {
                $imagePath = $image->store('products', 'public');
                $imageURL = asset('storage/' . $imagePath);
                $product->image = $imageURL; // Only update image if new one is valid
            } else {
                return response()->json(['error' => 'Invalid image file'], 400);
            }
        }

        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'unit' => $request->unit,
            'status' => $request->status,
            'category_id' => $request->category,
            'user_id' => $request->user,
            'image' => $product->image, // Keep existing image if not updated
        ]);

        $product->load(['category', 'user.roles']);

        return response()->json(['product' => $product], 200);
    }


    // Method to delete a product by ID
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully'], 200);
    }

    public function getProductsByRoleSlug($slug)
    {
        $products = Product::whereHas('user.roles', function ($query) use ($slug) {
            $query->where('slug', $slug);
        })
        ->with([
            'category',
            'user' => function($query) {
                $query->select('id', 'first_name');
            },
            'user.roles' => function($query) {
                $query->select('roles.name', 'roles.slug');
            }
        ])
        ->get();

        return response()->json(['products' => $products], 200);
    }

}