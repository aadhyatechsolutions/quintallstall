<?php

namespace Database\Seeders;

use App\Models\Apmc;
use Illuminate\Database\Seeder;

class ApmcSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Apmc::factory()->count(50)->create();
    }
}
