<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Vehicle;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $deliveryUser = User::whereHas('roles', function ($query) {
            $query->where('slug', 'delivery');  // Ensure the user has the delivery role
        })->first();  // Get the first user with the delivery role

        if ($deliveryUser) {
            // Insert records for the user with delivery role
            Vehicle::create([
                'user_id' => $deliveryUser->id,
                'vehicle_type' => 'Truck',
                'vehicle_no' => 'DL12345',
                'permit_number' => 'P1234',
                'insurance_number' => 'INS12345',
            ]);

            Vehicle::create([
                'user_id' => $deliveryUser->id,
                'vehicle_type' => 'Van',
                'vehicle_no' => 'DL67890',
                'permit_number' => 'P5678',
                'insurance_number' => 'INS67890',
            ]);

            Vehicle::create([
                'user_id' => $deliveryUser->id,
                'vehicle_type' => 'Bike',
                'vehicle_no' => 'DL54321',
                'permit_number' => 'P9876',
                'insurance_number' => 'INS54321',
            ]);
        }
    }
}
