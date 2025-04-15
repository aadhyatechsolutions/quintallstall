<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Review;
use App\Models\Product;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = Product::all();

        foreach ($products as $product) {
            Review::create([
                'product_id' => $product->id,
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'rating' => rand(3, 5),
                'comment' => 'This is a sample review for product ' . $product->name,
            ]);

            Review::create([
                'product_id' => $product->id,
                'name' => 'Jane Smith',
                'email' => 'jane@example.com',
                'rating' => rand(1, 5),
                'comment' => 'Another opinion about product ' . $product->name,
            ]);
        }
    }
}
