<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\VehicleType;

class VehicleSeeder extends Seeder
{
    public function run(): void
    {
        $deliveryUser = User::whereHas('roles', function ($query) {
            $query->where('slug', 'delivery');
        })->first();

        if ($deliveryUser) {
            $vehicleTypes = VehicleType::whereIn('type', [
                'Mini Truck',
                'Pickup Van',
                'Medium Truck',
            ])->pluck('id', 'type');

            // Ensure all required types exist
            if ($vehicleTypes->count() < 3) {
                throw new \Exception('One or more vehicle types not found in vehicle_types table');
            }

            Vehicle::create([
                'user_id' => $deliveryUser->id,
                'vehicle_type_id' => $vehicleTypes['Mini Truck'],
                'vehicle_no' => 'DL12345',
                'permit_number' => 'P1234',
                'insurance_number' => 'INS12345',
            ]);

            Vehicle::create([
                'user_id' => $deliveryUser->id,
                'vehicle_type_id' => $vehicleTypes['Pickup Van'],
                'vehicle_no' => 'DL67890',
                'permit_number' => 'P5678',
                'insurance_number' => 'INS67890',
            ]);

            Vehicle::create([
                'user_id' => $deliveryUser->id,
                'vehicle_type_id' => $vehicleTypes['Medium Truck'],
                'vehicle_no' => 'DL54321',
                'permit_number' => 'P9876',
                'insurance_number' => 'INS54321',
            ]);
        }
    }
}
