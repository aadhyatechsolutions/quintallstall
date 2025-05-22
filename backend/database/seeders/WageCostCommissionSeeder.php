<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WageCostCommissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('wage_cost_commission')->insert([
            [
                'cost' => 1500.00,
                'commission' => 150.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
