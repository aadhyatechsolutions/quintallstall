<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PlatformCommission;

class PlatformCommissionSeeder extends Seeder
{
    public function run()
    {
        PlatformCommission::insert([
            ['platform_price' => 100.00, 'created_at' => now(), 'updated_at' => now()],
            ['platform_price' => 150.50, 'created_at' => now(), 'updated_at' => now()],
            ['platform_price' => 200.75, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
