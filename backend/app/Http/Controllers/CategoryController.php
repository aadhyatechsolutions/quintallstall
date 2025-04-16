<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            if ($image->isValid()) {
                $imagePath = $image->store('categories', 'public');
                $imageURL = $imagePath;
            } else {
                return response()->json(['error' => 'Invalid image file'], 400);
            }
        } else {
            $imageURL = null;
        }

        $category = Category::create([
            'name' => $request->name,
            'description' => $request->description,
            'image' => $imageURL,
        ]);

        return response()->json(['category' => $category], 201);
    }

    public function index()
    {
        $categories = Category::all();
        return response()->json(['categories' => $categories], 200);
    }

    public function show($id)
    {
        $category = Category::findOrFail($id);
        return response()->json(['category' => $category], 200);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            if ($image->isValid()) {
                $imagePath = $image->store('categories', 'public');
                $imageURL = $imagePath;
                $category->image = $imageURL;
            } else {
                return response()->json(['error' => 'Invalid image file'], 400);
            }
        } else {
            $imageURL = null;
        }

        $category->update([
            'name' => $request->name,
            'description' => $request->description,
            'image' => $category->image,
        ]);

        return response()->json(['category' => $category], 200);
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json(['message' => 'Category deleted successfully'], 200);
    }
}
