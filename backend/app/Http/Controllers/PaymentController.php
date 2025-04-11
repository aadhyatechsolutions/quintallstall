<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    // Store a new payment for an order
    public function store(Request $request, $orderId)
    {
        $validated = $request->validate([
            'payment_method' => 'required|string',
            'payment_status' => 'required|in:paid,unpaid',
            'payment_amount' => 'required|numeric',
            'transaction_id' => 'required|string',
            'payment_date' => 'required|date',
        ]);

        $payment = Payment::create(array_merge($validated, ['order_id' => $orderId]));
        return response()->json($payment, 201);
    }

    // Update the specified payment
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'payment_status' => 'in:paid,unpaid',
            'payment_amount' => 'numeric',
            'transaction_id' => 'string',
        ]);

        $payment = Payment::findOrFail($id);
        $payment->update($validated);

        return response()->json($payment);
    }

    // Remove the specified payment
    public function destroy($id)
    {
        $payment = Payment::findOrFail($id);
        $payment->delete();

        return response()->json(null, 204);
    }
}
