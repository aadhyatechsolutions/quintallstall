<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $fillable = [
        'user_id', 'vehicle_type_id', 'vehicle_no', 'permit_number','permit_expiry_date', 'insurance_number', 'insurance_expiry_date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function vehicleType()
    {
        return $this->belongsTo(VehicleType::class);
    }
}
