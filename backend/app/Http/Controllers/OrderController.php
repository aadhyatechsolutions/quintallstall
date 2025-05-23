<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ShippingDetail;
use App\Models\Payment;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    
    public function index()
    {
        $user = auth()->user();

        $roles = $user->roles->pluck('slug')->toArray();

        if (in_array('admin', $roles) || in_array('delivery', $roles)) {
            $orders = Order::with(['orderItems.product.seller', 'orderItems.product.apmc', 'shippingDetails', 'payment', 'buyer'])->get();
        } else {
            $orders = Order::whereHas('orderItems.product', function ($query) use ($user) {
                $query->where('seller_id', $user->id);
            })
            ->with(['orderItems.product.seller','orderItems.product.apmc', 'shippingDetails', 'payment', 'buyer'])
            ->get();
        }

        return response()->json(['orders' => $orders], 200);
    }

    
    public function show($id)
    {
        $order = Order::with(['orderItems', 'shippingDetails', 'payment'])->findOrFail($id);
        return response()->json($order);
    }

    
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return response()->json(null, 204);
    }

    public function placeOrder(Request $request)
    {
        $user = auth()->user(); // Authenticated via Sanctum

        $request->validate([
            'shipping_address' => 'required|string',
            'payment_method' => 'required|in:card,upi,cod,wallet,netbanking',
            'amount' => 'required|numeric',
        ]);

        DB::beginTransaction();

        try {
            // Get cart
            $cart = Cart::where('buyer_id', $user->id)->first();

            if (!$cart || $cart->items->isEmpty()) {
                return response()->json(['message' => 'Cart is empty.'], 400);
            }

            // Calculate subtotal (product prices)
            $subtotal = $cart->items->sum(fn($item) => $item->quantity * $item->price);

            // Get cost components
            $wageRow = DB::table('wage_cost_commission')->latest('id')->first();
            $platformRow = DB::table('platform_commissions')->latest('id')->first();
            $taxRow = DB::table('taxes')->latest('id')->first();

            $wageCost = $wageRow->commission ?? 0;
            $platformCost = $platformRow->platform_price ?? 0;

            $taxRate = ($taxRow->cgst ?? 0) + ($taxRow->sgst ?? 0) + ($taxRow->igst ?? 0);
            $taxAmount = $subtotal * ($taxRate / 100);
            
            $finalAmount = round($subtotal + $wageCost + $platformCost + $taxAmount, 2);
            return $finalAmount;
            // Verify frontend amount (optional, but recommended)
            if (round($request->amount, 2) != $finalAmount) {
                return response()->json(['message' => 'Amount mismatch.'], 422);
            }

            // Create order
            $order = Order::create([
                'buyer_id' => $user->id,
                'order_status' => 'pending',
                'total_amount' => $finalAmount,
                'wage_cost' => $wageCost,
                'platform_cost' => $platformCost,
                'tax' => $taxAmount,
                'shipping_address' => $request->shipping_address,
            ]);

            // Add items to order
            foreach ($cart->items as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->price,
                    'total' => $cartItem->quantity * $cartItem->price,
                ]);
            }

            // Handle payment
            if ($request->payment_method === 'cod') {
                $payment = Payment::create([
                    'order_id' => $order->id,
                    'payment_method' => 'cod',
                    'amount' => $finalAmount,
                    'transaction_id' => null,
                    'payment_status' => 'pending',
                    'paid_at' => null,
                    'error_message' => null,
                ]);
            } else {
                // Simulate online payment verification
                $verified = true; // This would normally come from the payment gateway
                $transactionId = uniqid('txn_');

                $payment = Payment::create([
                    'order_id' => $order->id,
                    'payment_method' => $request->payment_method,
                    'amount' => $finalAmount,
                    'transaction_id' => $transactionId,
                    'payment_status' => $verified ? 'success' : 'failed',
                    'paid_at' => now(),
                    'error_message' => $verified ? null : 'Payment verification failed',
                ]);

                // Update order status
                $order->update([
                    'order_status' => $verified ? 'completed' : 'failed',
                ]);
            }

            // Clear cart
            $cart->items()->delete();

            DB::commit();

            return response()->json([
                'message' => 'Order placed successfully.',
                'order_id' => $order->id,
                'order_status' => $order->order_status,
                'payment_status' => $payment->payment_status,
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to place order',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'order_status' => 'required|in:pending,accepted,completed,cancelled,failed',
        ]);

        try {
            $order = Order::findOrFail($id);
            $order->order_status = $validated['order_status'];

            // Optionally: Assign delivery_user_id if accepted
            if ($validated['order_status'] === 'accepted' && auth()->check()) {
                $order->delivery_user_id = auth()->id();
            }

            $order->save();
           
            $updatedOrder = Order::with([
                'orderItems.product.seller',
                'orderItems.product.apmc',
                'shippingDetails',
                'payment',
                'buyer'
            ])->findOrFail($id);
            return response()->json([
                'message' => 'Order status updated successfully',
                'success' => true,
                'order' => $updatedOrder
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update order status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}
