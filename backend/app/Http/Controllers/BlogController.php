<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::with('category')->latest()->get();

        return response()->json($blogs);
    }

    public function store(Request $request)
    {   
        $data = $request->validate([
            'title' => 'required|string',
            'excerpt' => 'required|string',
            'content' => 'required|string', // JSON string
            'image' => 'required|image',    // uploaded image file validation
            'author' => 'required|string',
            'tags' => 'required|string',    // will decode to array
            'blog_category_id' => 'required|integer|exists:blog_categories,id', // validate category exists
        ]);

        // Decode JSON string content and tags
        $data['content'] = json_decode($data['content'], true);
        $data['tags'] = json_decode($data['tags'], true);

        if (!is_array($data['tags'])) {
            return response()->json(['message' => 'Tags must be a valid JSON array.'], 422);
        }

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('blogs', 'public');
            $data['image'] = $path;
        }

        $blog = Blog::create($data);

        return response()->json($blog, 201);
    }



    public function show(Blog $blog)
    {
        return response()->json($blog);
    }

    public function update(Request $request, Blog $blog)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'excerpt' => 'required|string',
            'content' => 'required|string', // JSON string
            'image' => 'sometimes|image',  // optional image on update
            'author' => 'required|string',
            'tags' => 'required|string',    // JSON string to decode
            'blog_category_id' => 'required|integer|exists:blog_categories,id',
        ]);

        // Decode JSON strings
        $data['content'] = json_decode($data['content'], true);
        $data['tags'] = json_decode($data['tags'], true);

        // Validate tags is array
        if (!is_array($data['tags'])) {
            return response()->json(['message' => 'Tags must be a valid JSON array.'], 422);
        }

        // Handle optional image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('blogs', 'public');
            $data['image'] = $path;
        }

        $blog->update($data);

        return response()->json($blog);
    }

    public function destroy(Blog $blog)
    {
        $blog->delete();

        return response()->json(['message' => 'Blog deleted']);
    }
}
