<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WageCostCommission extends Model
{
    use HasFactory;

    protected $table = 'wage_cost_commission';

    protected $fillable = [
        'cost',
        'commission',
    ];
}
