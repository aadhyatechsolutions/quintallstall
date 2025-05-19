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
            'permissions' => '["products","retailer","frontend","order","delivery","settings","commission","wholesaler"]'
        ]);
        Role::create([
            'name' => 'Wholesaler',
            'slug' => 'wholesaler',
            'description' => 'Administrator role',
            'permissions' => '["products","order","wholesaler"]'
        ]);
        Role::create([
            'name' => 'Retailer',
            'slug' => 'retailer',
            'description' => 'Administrator role',
            'permissions' => '["products","order","retailer"]'
        ]);
        Role::create([
            'name' => 'Delivery',
            'slug' => 'delivery',
            'description' => 'Administrator role',
            'permissions' => '["products","order","delivery"]'
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
