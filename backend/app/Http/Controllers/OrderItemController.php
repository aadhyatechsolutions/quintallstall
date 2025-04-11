<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    // Store a newly created order item in storage
    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
        ]);

        $orderItem = OrderItem::create($validated);
        return response()->json($orderItem, 201);
    }

    // Update the specified order item in storage
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'quantity' => 'integer',
            'price' => 'numeric',
        ]);

        $orderItem = OrderItem::findOrFail($id);
        $orderItem->update($validated);

        return response()->json($orderItem);
    }

    // Remove the specified order item from storage
    public function destroy($id)
    {
        $orderItem = OrderItem::findOrFail($id);
        $orderItem->delete();

        return response()->json(null, 204);
    }
}
