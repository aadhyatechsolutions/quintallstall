<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wallet;
use App\Models\Coin;

class WalletController extends Controller
{
    // Activate Wallet
    public function activate($id)
    {
        $wallet = Wallet::find($id);
        if (!$wallet) {
            return response()->json(['message' => 'Wallet not found'], 404);
        }

        $wallet->status = 'Active';
        $wallet->save();

        return response()->json(['wallet' => $wallet], 200);
    }

    // Deactivate Wallet
    public function deactivate($id)
    {
        $wallet = Wallet::find($id);
        if (!$wallet) {
            return response()->json(['message' => 'Wallet not found'], 404);
        }

        $wallet->status = 'Inactive';
        $wallet->save();

        return response()->json(['wallet' => $wallet], 200);
    }

    // Add Amount to Wallet
    public function addAmount(Request $request, $id)
    {
        $request->validate([
            'amount' => 'required|numeric|min:0.01',
            'coin_id' => 'required|exists:coins,id'
        ]);

        $wallet = Wallet::find($id);
        if (!$wallet) {
            return response()->json(['message' => 'Wallet not found'], 404);
        }

        $wallet->amount += $request->amount;
        $wallet->save();

        return response()->json([
            'wallet' => $wallet,
            'message' => 'Amount added successfully'
        ], 200);
    }
}
