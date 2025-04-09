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
            'category' => 'required|exists:categories,id',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);
        
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            if ($image->isValid()) {
                $imagePath = $image->store('products', 'public');
                $imageURL = asset('storage/' . $imagePath);
            } else {
                return response()->json(['error' => 'Invalid image file'], 400);
            }
        }else{
            $imageURL = null; 
        }
        
        $product = Product::create([
            'name' => $request->name,
            'category_id' => $request->category,
            'description' => $request->description,
            'image' => $imageURL,
        ]);
        $product->load('category');
        return response()->json(['product' => $product], 201);
    }

    public function index()
    {
        $products = Product::with('category')->get();
        return response()->json(['products' => $products], 200);
    }
    public function show($id)
    {
        $product = Product::findOrFail($id); 
        $product->load('category');
        return response()->json(['product' => $product], 200);
    }
    
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            if ($image->isValid()) {
                $imagePath = $image->store('products', 'public');
                $imageURL = asset('storage/' . $imagePath);
            } else {
                return response()->json(['error' => 'Invalid image file'], 400);
            }
        }else{
            $imageURL = null; 
        }

        $product->update([
            'name' => $request->name,
            'category' => $request->category,
            'description' => $request->description,
            'image' => $imageURL,
        ]);
        $product->load('category');
        return response()->json(['product' => $product], 200);
    }

    // Method to delete a product by ID
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}