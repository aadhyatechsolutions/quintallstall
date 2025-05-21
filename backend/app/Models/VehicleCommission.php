<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleCommission extends Model
{
    use HasFactory;
    protected $fillable = [
        'vehicle_type_id',
        'commission_rate',
        'v_fare',
        'b_fare',
    ];

    public function vehicleType()
    {
        return $this->belongsTo(VehicleType::class);
    }
}
