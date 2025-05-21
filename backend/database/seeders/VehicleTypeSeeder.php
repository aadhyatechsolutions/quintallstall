<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\VehicleType;

class VehicleTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            ['type' => 'Mini Truck', 'loading_capacity' => 1500],
            ['type' => 'Pickup Van', 'loading_capacity' => 2000],
            ['type' => 'Medium Truck', 'loading_capacity' => 5000],
            ['type' => 'Heavy Truck', 'loading_capacity' => 10000],
        ];

        foreach ($types as $type) {
            VehicleType::create($type);
        }
    }
}
