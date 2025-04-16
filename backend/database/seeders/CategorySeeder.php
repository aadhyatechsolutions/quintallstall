<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                "name" => "Vegetables",
                "description" => "Vegetables",
                "image" => "vegetables.jpg"
            ],
            [
                "name" => "Exotic Vegetable",
                "description" => "Exotic Vegetable",
                "image" => "vegetables.jpg"
            ],
            [
                "name" => "Fruits",
                "description" => "Fruits",
                "image" => "Culinary_fruits_front_view.jpg"
            ],
            [
                "name" => "Exotic Fruits",
                "description" => "Exotic Fruits",
                "image" => "Culinary_fruits_front_view.jpg"
            ],
            [
                "name" => "Flowers",
                "description" => "Flower",
                "image" => "1722317604veg.jpg"
            ],
            [
                "name" => "Exotic Flowers",
                "description" => "Exotic Flowers",
                "image" => "1722317604veg.jpg"
            ],
        ];

        $destinationPath = public_path('storage/categories');
        if (!File::exists($destinationPath)) {
            File::makeDirectory($destinationPath, 0755, true);
        }

        foreach ($categories as $category) {
            $sourcePath = database_path('seeders/categories/' . $category['image']);
            $targetPath = $destinationPath . '/' . $category['image'];

            // Copy image from local source if it exists
            if (File::exists($sourcePath)) {
                File::copy($sourcePath, $targetPath);
            } else {
                echo "⚠️  Image not found: {$category['image']}\n";
            }

            Category::create([
                'name' => $category['name'],
                'description' => $category['description'],
                'image' => 'categories/' . $category['image'],
            ]);
        }
    }
}
