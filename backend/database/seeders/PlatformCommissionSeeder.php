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
        ]);
    }
}
