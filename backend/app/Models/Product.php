<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'description',
        'price',
        'quantity',
        'category_id',
        'seller_id',
        'image',
        'status',
        'apmc_id',       // New relationship field
        'sku',            // Additional fields
        'production',
        'quality',
        'ud_field',
        'return_policy',
        'discount_price',
        'feature_image',  // If you're saving feature image
    ];


    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function seller()
    {
        return $this->belongsTo(User::class);
    }
    public function apmc()
    {
        return $this->belongsTo(Apmc::class); 
    }
}
