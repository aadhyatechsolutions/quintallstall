<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $user = auth()->user();

        // Find or create a cart for the buyer
        $cart = Cart::firstOrCreate(['buyer_id' => $user->id]);

        $product = Product::findOrFail($validated['product_id']);

        // Check if item already exists
        $item = $cart->items()->where('product_id', $product->id)->first();

        if ($item) {
            $item->quantity += $validated['quantity'];
            $item->save();
        } else {
            $cart->items()->create([
                'product_id' => $product->id,
                'quantity' => $validated['quantity'],
                'price' => $product->price,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Product added to cart']);
    }

    public function viewCart()
    {
        $cart = Cart::with('items.product')->where('buyer_id', auth()->id())->first();

        if (!$cart) {
            return response()->json(['cart' => [], 'total' => 0]);
        }

        $total = $cart->items->sum(fn($item) => $item->price * $item->quantity);

        return response()->json([
            'cart' => $cart,
            'total' => $total
        ]);
    }

    public function updateCartItem(Request $request, $id)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $item = CartItem::findOrFail($id);

        if ($item->cart->buyer_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $item->quantity = $validated['quantity'];
        $item->save();

        return response()->json(['message' => 'Cart item updated']);
    }

    public function removeCartItem($id)
    {
        $item = CartItem::findOrFail($id);

        if ($item->cart->buyer_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $item->delete();

        return response()->json(['message' => 'Item removed from cart']);
    }
    public function clearCart()
    {
        $cart = Cart::where('buyer_id', auth()->id())->first();

        if (!$cart) {
            return response()->json(['message' => 'Cart already empty'], 200);
        }

        $cart->items()->delete();
        $cart->delete();

        return response()->json([
            'success' => true,
            'message' => 'Cart cleared successfully'
        ]);
    }
}

