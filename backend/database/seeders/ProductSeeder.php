<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Role;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Retrieve the 'wholesaler' and 'retailer' roles
        $wholesalerRole = Role::where('slug', 'wholesaler')->first();
        $retailerRole = Role::where('slug', 'retailer')->first();

        // Ensure roles exist before proceeding
        if (!$wholesalerRole || !$retailerRole) {
            echo "Wholesaler or Retailer roles are missing!";
            return;
        }

        // Get all users who have either 'wholesaler' or 'retailer' role
        $users = User::whereHas('roles', function ($query) use ($wholesalerRole, $retailerRole) {
            $query->whereIn('roles.id', [$wholesalerRole->id, $retailerRole->id]);
        })->get();

        // If no users with the roles exist, exit
        if ($users->isEmpty()) {
            echo "No users with wholesaler or retailer role found!";
            return;
        }

        // Seed 5 products for each user who has 'wholesaler' or 'retailer' role
        foreach ($users as $user) {
            // Create multiple products for each user
            for ($i = 1; $i <= 5; $i++) {
                Product::create([
                    'name' => 'Product ' . $i . ' for ' . $user->first_name,
                    'description' => 'Description for Product ' . $i,
                    'price' => rand(10, 100) . '.99',  // Random price between 10.99 and 100.99
                    'user_id' => $user->id,  // Associate the product with the user
                    'category_id' => rand(1, 5), // Assuming category_id between 1 and 5 exist
                ]);
            }
        }
    }
}
