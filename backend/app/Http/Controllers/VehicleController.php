<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function getVehicleTypes()
    {
        $types = [
            ['value' => '3_wheeler_rickshaw', 'label' => '3 Wheeler - Rickshaw'],
            ['value' => '3_wheeler_camper', 'label' => '3 Wheeler - Camper'],
            ['value' => 'tata_ace', 'label' => 'Tata Ace'],
            ['value' => 'bolero_pickup_1', 'label' => 'Bolero Pick-up - 1'],
            ['value' => 'bolero_pickup_2', 'label' => 'Bolero Pick-up - 2'],
        ];

        return response()->json($types);
    }
}
