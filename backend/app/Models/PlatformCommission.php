<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlatformCommission extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'platform_price',
    ];
}
