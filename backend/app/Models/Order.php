<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'buyer_id',
        'order_status',
        'total_amount',
        'wage_cost',
        'platform_cost',
        'tax',
        'shipping_address',
        'payment_status',
        'payment_id',
    ];

    // Define relationship to order_items
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    // Define relationship to shipping_details
    public function shippingDetails()
    {
        return $this->hasOne(ShippingDetail::class);
    }

    // Define relationship to payments
    public function payment()
    {
        return $this->hasOne(Payment::class); 
    }
    public function buyer()
    {
        return $this->belongsTo(User::class); 
    }
}
