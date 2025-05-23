<?php

namespace App\Http\Controllers;

use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BlogCategoryController extends Controller
{
    public function index()
    {
        $categories = BlogCategory::all();

        return response()->json(['blogCategories' => $categories], Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:blog_categories,name',
            'description' => 'nullable|string',
        ]);

        $category = BlogCategory::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return response()->json(['blogCategory' => $category, 'message' => 'Blog category created successfully.'], Response::HTTP_CREATED);
    }

    public function show($id)
    {
        $category = BlogCategory::find($id);

        if (!$category) {
            return response()->json(['message' => 'Blog category not found.'], Response::HTTP_NOT_FOUND);
        }

        return response()->json(['blogCategory' => $category], Response::HTTP_OK);
    }

    public function update(Request $request, $id)
    {
        $category = BlogCategory::find($id);

        if (!$category) {
            return response()->json(['message' => 'Blog category not found.'], Response::HTTP_NOT_FOUND);
        }

        $request->validate([
            'name' => 'required|string|unique:blog_categories,name,' . $id,
            'description' => 'nullable|string',
        ]);

        $category->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return response()->json(['blogCategory' => $category, 'message' => 'Blog category updated successfully.'], Response::HTTP_OK);
    }

    public function destroy($id)
    {
        $category = BlogCategory::find($id);

        if (!$category) {
            return response()->json(['message' => 'Blog category not found.'], Response::HTTP_NOT_FOUND);
        }

        $category->delete();

        return response()->json(['message' => 'Blog category deleted successfully.'], Response::HTTP_OK);
    }
}
