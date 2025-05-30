<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Role::create([
            'name' => 'Admin',
            'slug' => 'admin',
            'description' => 'Administrator role',
            'permissions' => '["products","frontend","orders","delivery","settings","commissions","wholesaler"]'
        ]);
        Role::create([
            'name' => 'Wholesaler',
            'slug' => 'wholesaler',
            'description' => 'Administrator role',
            'permissions' => '["products","orders","coin","wallet"]'
        ]);
        // Role::create([
        //     'name' => 'Retailer',
        //     'slug' => 'retailer',
        //     'description' => 'Administrator role',
        //     'permissions' => '["products","orders","coin","wallet"]'
        // ]);
        Role::create([
            'name' => 'Delivery',
            'slug' => 'delivery',
            'description' => 'Administrator role',
            'permissions' => '["orders"]'
        ]);
        Role::create([
            'name' => 'Staff',
            'slug' => 'staff',
            'description' => 'Staff role',
            'permissions' => '["products"]'
        ]);
        Role::create([
            'name' => 'User',
            'slug' => 'user',
            'description' => 'Regular user role',
        ]);
    }
}
