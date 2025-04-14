<?php

namespace App\Http\Controllers;

use App\Models\Coin;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CoinController extends Controller
{
    public function index()
    {
        $coins = Coin::all();
        return response()->json(['coins' => $coins], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|unique:coins,name',
            'description' => 'nullable|string',
            'value' => 'required|numeric|min:0',
            'status' => 'string'
        ]);

        $coin = Coin::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'description' => $validated['description'] ?? null,
            'value' => $validated['value'],
            'status' => $validated['status'] ?? true,
        ]);

        return response()->json([
            'message' => 'Coin created successfully',
            'coin' => $coin
        ], 201);
    }

    public function show($id)
    {
        $coin = Coin::findOrFail($id);
        return response()->json(['coin' => $coin], 200);
    }

    public function update(Request $request, Coin $coin)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|unique:coins,name,' . $coin->id,
            'description' => 'nullable|string',
            'value' => 'sometimes|required|numeric|min:0',
            'status' => 'string'
        ]);

        if (isset($validated['name'])) {
            $coin->name = $validated['name'];
            $coin->slug = Str::slug($validated['name']);
        }

        $coin->fill($validated);
        $coin->save();

        return response()->json([
            'message' => 'Coin updated successfully',
            'data' => $coin
        ]);
    }

    public function destroy(Coin $coin)
    {
        $coin->delete();

        return response()->json(['message' => 'Coin deleted successfully']);
    }
    public function fetchCoinById($id)
    {
        $coin = Coin::find($id);

        if (!$coin) {
            return response()->json(['message' => 'Coin not found'], 404);
        }

        return response()->json(['coin' => $coin], 200);
    }
}
