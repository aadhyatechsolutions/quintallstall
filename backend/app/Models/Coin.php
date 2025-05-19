<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coin extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'description', 'value', 'status'];
    public function purchaseCoins()
    {
        return $this->hasMany(PurchaseCoin::class);
    }
}
