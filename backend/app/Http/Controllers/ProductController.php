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
        // Validate the request data, including the new fields
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|numeric|min:0',
            'unit' => 'required|in:kg,gram,quintal',
            'status' => 'required|string|in:active,inactive',
            'category' => 'required|exists:categories,id',
            'seller' => 'required|exists:users,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'feature_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // validation for feature image
            'sku' => 'required|string|max:255',
            'production' => 'required|string|max:255',
            'quality' => 'required|in:a,b,c', // Quality can be 'a', 'b', or 'c'
            'ud_field' => 'required|string|max:255',
            'return_policy' => 'required|string|max:255',
            'discount_price' => 'nullable|numeric|min:0',
            'apmc' => 'nullable|exists:apmcs,id', // APMCs, ensuring the APMC exists
        ]);

        // Handle image upload
        $imageURL = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            if ($image->isValid()) {
                $imagePath = $image->store('products', 'public');
                $imageURL = $imagePath;
            } else {
                return response()->json(['error' => 'Invalid image file'], 400);
            }
        }

        // Handle feature image upload
        $featureImageURL = null;
        if ($request->hasFile('feature_image')) {
            $featureImage = $request->file('feature_image');
            if ($featureImage->isValid()) {
                $featureImagePath = $featureImage->store('products/feature_images', 'public');
                $featureImageURL = $featureImagePath;
            } else {
                return response()->json(['error' => 'Invalid feature image file'], 400);
            }
        }

        // Create product with all the required fields including the new ones
        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'unit' => $request->unit,
            'status' => $request->status,
            'category_id' => $request->category,
            'seller_id' => $request->seller,
            'image' => $imageURL,
            'feature_image' => $featureImageURL, // Add feature image URL
            'sku' => $request->sku,
            'production' => $request->production,
            'quality' => $request->quality,
            'ud_field' => $request->ud_field,
            'return_policy' => $request->return_policy,
            'discount_price' => $request->discount_price,
            'apmc_id' => $request->apmc, // Add APMC ID
        ]);

        // Load necessary relationships
        $product->load(['category', 'seller.roles', 'apmc']);

        return response()->json(['product' => $product], 201);
    }



    public function index()
    {
        $products = Product::with([
            'category',
            'apmc',
            'seller' => function($query) {
                $query->select('id', 'first_name');
            },
            'seller.roles' => function($query) {
                $query->select('roles.name', 'roles.slug');
            }
        ])->get();
        
        return response()->json(['products' => $products], 200);
    }
    public function show($id)
    {
        $product = Product::with([
            'category',
            'apmc',
            'seller' => function($query) {
                $query->select('id', 'first_name');
            },
            'seller.roles' => function($query) {
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
            'seller' => 'required|exists:users,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'feature_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'sku' => 'required|string|max:255',
            'production' => 'required|string|max:255',
            'quality' => 'required|in:a,b,c',
            'ud_field' => 'required|string|max:255',
            'return_policy' => 'required|string|max:255',
            'discount_price' => 'nullable|numeric|min:0',
            'apmc' => 'nullable|exists:apmcs,id',
        ]);

        // Handle image upload if a new one is provided
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            if ($image->isValid()) {
                $imagePath = $image->store('products', 'public');
                $product->image = $imagePath;
            } else {
                return response()->json(['error' => 'Invalid image file'], 400);
            }
        }

        // Handle feature image upload if a new one is provided
        if ($request->hasFile('feature_image')) {
            $featureImage = $request->file('feature_image');
            if ($featureImage->isValid()) {
                $featureImagePath = $featureImage->store('products/feature_images', 'public');
                $product->feature_image = $featureImagePath;
            } else {
                return response()->json(['error' => 'Invalid feature image file'], 400);
            }
        }

        // Update product fields
        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'unit' => $request->unit,
            'status' => $request->status,
            'category_id' => $request->category,
            'seller_id' => $request->seller,
            'sku' => $request->sku,
            'production' => $request->production,
            'quality' => $request->quality,
            'ud_field' => $request->ud_field,
            'return_policy' => $request->return_policy,
            'discount_price' => $request->discount_price,
            'apmc_id' => $request->apmc,
            'image' => $product->image, // Keep existing image if not updated
            'feature_image' => $product->feature_image, // Same for feature image
        ]);

        $product->load(['category', 'seller.roles', 'apmc']);

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
        $products = Product::whereHas('seller.roles', function ($query) use ($slug) {
            $query->where('slug', $slug);
        })
        ->with([
            'category',
            'seller' => function($query) {
                $query->select('id', 'first_name');
            },
            'seller.roles' => function($query) {
                $query->select('roles.name', 'roles.slug');
            }
        ])
        ->get();

        return response()->json(['products' => $products], 200);
    }
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:active,inactive',
        ]);
    
        $product = Product::findOrFail($id);
        $product->status = $request->status;
        $product->save();
    
        // Eager load relationships for response
        $product->load(['category', 'seller.roles']);
    
        return response()->json([
            'product' => $product,
            'message' => 'Product status updated successfully.',
        ], 200);
    }
    public function fetchBySeller()
    {
        $user = auth()->user();

        $products = Product::with([
            'category',
            'seller:id,first_name',
            'seller.roles:name,slug'
        ])->where('seller_id', $user->id)->get();

        return response()->json(['products' => $products], 200);
    }
}