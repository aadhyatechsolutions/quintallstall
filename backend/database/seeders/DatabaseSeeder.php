<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(AddressSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(BankAccountSeeder::class);
        $this->call(ApmcSeeder::class);
        $this->call(VehicleTypeSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(VehicleSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(ProductSeeder::class);

        $this->call(OrderSeeder::class);

        $this->call(CoinSeeder::class);
        $this->call(ReviewSeeder::class);
        $this->call(BlogSeeder::class);
        
    }
}
