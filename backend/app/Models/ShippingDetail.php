<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'address',
        'city',
        'state',
        'postal_code',
        'country',
        'shipping_method',
    ];

    // Define relationship to order
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
