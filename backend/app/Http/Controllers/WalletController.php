<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wallet;
use App\Models\Coin;
use Illuminate\Support\Facades\Auth;

class WalletController extends Controller
{
    public function addAmount(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1'   
        ]);

        $wallet = Wallet::where('user_id', Auth::id())->first();
        
        if (!$wallet) {
            return response()->json(['message' => 'Wallet not found for this user'], 404);
        }


        $wallet->amount += $request->amount;
        $wallet->save();

        return response()->json([
            'message' => 'Coin added successfully',
            'wallet' => $wallet
        ], 200);
    }
    public function getWallet()
    {
        $wallet = Wallet::where('user_id', Auth::id())->first();

        if (!$wallet) {
            return response()->json(['message' => 'Wallet not found for this user'], 404);
        }

        return response()->json(['wallet' => $wallet], 200);
    }
    public function update(Request $request)
    {
        $wallet = Wallet::where('user_id', Auth::id())->first(); 

        if (!$wallet) {
            return response()->json(['message' => 'Wallet not found for this user'], 404);
        }
        $request->validate([
            'status' => 'required|string|in:Active,Inactive',
        ]);
        $wallet->status = $request->status;
        $wallet->save();

        return response()->json([
            'message' => 'Wallet updated successfully',
            'wallet' => $wallet
        ], 200);
    }

}
