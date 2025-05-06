<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Apmc extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'location', 'area', 'village', 'taluka', 'city', 'state', 'pincode', 'image'];

    public function users()
    {
        return $this->hasMany(User::class);
    }
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
