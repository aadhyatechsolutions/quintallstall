<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ShippingDetail;
use App\Models\Payment;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // Display a listing of orders
    public function index()
    {
        $orders = Order::with(['orderItems', 'shippingDetails', 'payment'])->get();
        return response()->json($orders);
    }

    // Show the form for creating a new order
    public function create()
    {
        // Add logic to return necessary data for creating an order (e.g., products, shipping methods)
    }

    // Store a newly created order in storage
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'order_status' => 'required|in:pending,completed,cancelled,shipped',
            'total_amount' => 'required|numeric',
            'shipping_address_id' => 'required|exists:shipping_details,id',
            'payment_status' => 'required|in:paid,unpaid',
        ]);

        $order = Order::create($validated);

        // Save OrderItems, ShippingDetails, and Payments here
        // Example: add logic to save OrderItems
        foreach ($request->order_items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        ShippingDetail::create([
            'order_id' => $order->id,
            'address' => $request->shipping_address['address'],
            'city' => $request->shipping_address['city'],
            'state' => $request->shipping_address['state'],
            'postal_code' => $request->shipping_address['postal_code'],
            'country' => $request->shipping_address['country'],
            'shipping_method' => $request->shipping_address['shipping_method'],
        ]);

        Payment::create([
            'order_id' => $order->id,
            'payment_method' => $request->payment['payment_method'],
            'payment_status' => $request->payment['payment_status'],
            'payment_amount' => $request->payment['payment_amount'],
            'transaction_id' => $request->payment['transaction_id'],
            'payment_date' => now(),
        ]);

        return response()->json($order, 201);
    }

    // Display the specified order
    public function show($id)
    {
        $order = Order::with(['orderItems', 'shippingDetails', 'payment'])->findOrFail($id);
        return response()->json($order);
    }

    // Update the specified order in storage
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'order_status' => 'in:pending,completed,cancelled,shipped',
            'total_amount' => 'numeric',
            'payment_status' => 'in:paid,unpaid',
        ]);

        $order = Order::findOrFail($id);
        $order->update($validated);

        // Handle updates to related entities (OrderItems, ShippingDetails, Payments)
        // You can add the logic for updating related models here as needed

        return response()->json($order);
    }

    // Remove the specified order from storage
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return response()->json(null, 204);
    }
}
