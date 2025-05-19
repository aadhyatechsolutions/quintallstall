<?php

namespace App\Http\Controllers;

use App\Models\PurchaseCoin;
use Illuminate\Http\Request;

class PurchaseCoinController extends Controller
{
    public function index()
    {
        $coins = PurchaseCoin::with('coin')->where('user_id', auth()->id())->get();

        return response()->json([
            'message' => 'Purchase coins fetched successfully',
            'purchaseCoins' => $coins
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'coin_id' => 'required|exists:coins,id',
            'quantity' => 'required|numeric|min:1'
        ]);

        $purchaseCoin = PurchaseCoin::create([
            'user_id' => auth()->id(),
            'coin_id' => $request->coin_id,
            'quantity' => $request->quantity
        ]);

        return response()->json([
            'message' => 'Purchase coin added successfully',
            'purchaseCoin' => $purchaseCoin
        ], 201);
    }

   
}
