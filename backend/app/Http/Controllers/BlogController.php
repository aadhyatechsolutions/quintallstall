<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        return response()->json(Blog::latest()->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'excerpt' => 'required|string',
            'content' => 'required|array',
            'image' => 'required|url',
            'date' => 'required|date',
            'author' => 'required|string',
            'read_time' => 'required|string',
            'tags' => 'required|array',
        ]);

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
            'title' => 'sometimes|required|string',
            'excerpt' => 'sometimes|required|string',
            'content' => 'sometimes|required|array',
            'image' => 'sometimes|required|url',
            'date' => 'sometimes|required|date',
            'author' => 'sometimes|required|string',
            'read_time' => 'sometimes|required|string',
            'tags' => 'sometimes|required|array',
        ]);

        $blog->update($data);

        return response()->json($blog);
    }

    public function destroy(Blog $blog)
    {
        $blog->delete();

        return response()->json(['message' => 'Blog deleted']);
    }
}
