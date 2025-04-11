<?php

namespace App\Http\Controllers;

use App\Models\ShippingDetail;
use Illuminate\Http\Request;

class ShippingDetailController extends Controller
{
    // Store shipping details for an order
    public function store(Request $request, $orderId)
    {
        $validated = $request->validate([
            'address' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'postal_code' => 'required|string',
            'country' => 'required|string',
            'shipping_method' => 'required|string',
        ]);

        $shippingDetail = ShippingDetail::create(array_merge($validated, ['order_id' => $orderId]));
        return response()->json($shippingDetail, 201);
    }

    // Update shipping details
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'address' => 'string',
            'city' => 'string',
            'state' => 'string',
            'postal_code' => 'string',
            'country' => 'string',
            'shipping_method' => 'string',
        ]);

        $shippingDetail = ShippingDetail::findOrFail($id);
        $shippingDetail->update($validated);

        return response()->json($shippingDetail);
    }

    // Remove shipping details
    public function destroy($id)
    {
        $shippingDetail = ShippingDetail::findOrFail($id);
        $shippingDetail->delete();

        return response()->json(null, 204);
    }
}
