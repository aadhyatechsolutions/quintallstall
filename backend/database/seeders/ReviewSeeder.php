<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Review;
use App\Models\Product;
use App\Models\User;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = Product::all();
        $users = User::all();

        foreach ($products as $product) {
            // Get two random users
            $randomUsers = $users->random(min(2, $users->count()));

            foreach ($randomUsers as $user) {
                Review::create([
                    'product_id' => $product->id,
                    'user_id' => $user->id,
                    'name' => $user->first_name,
                    'email' => $user->email,
                    'rating' => rand(1, 5),
                    'comment' => 'Review by ' . $user->name . ' on product ' . $product->name,
                ]);
            }
        }
    }
}
