<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaxSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('taxes')->insert([
            [
                'cgst' => 9.00,
                'sgst' => 9.00,
                'igst' => 18.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
        ]);
    }
}
