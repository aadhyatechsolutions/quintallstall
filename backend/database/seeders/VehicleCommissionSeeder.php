<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class VehicleCommissionSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('vehicle_commissions')->insert([
            [
                'vehicle_type_id' => 1,  // Add valid vehicle_type_id here
                'v_fare' => 500,
                'b_fare' => 100,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'vehicle_type_id' => 2,
                'v_fare' => 750,
                'b_fare' => 150,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'vehicle_type_id' => 3,
                'v_fare' => 1000,
                'b_fare' => 200,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
