<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BlogCategory;

class BlogCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Technology', 'description' => 'Latest trends and insights in tech.'],
            ['name' => 'Health', 'description' => 'Tips and research on healthy living.'],
            ['name' => 'Travel', 'description' => 'Travel guides and destination ideas.'],
            ['name' => 'Nutrition', 'description' => 'Food and nutrients for better well-being.'],
            ['name' => 'Myth Busting', 'description' => 'Debunking common health and food myths.'],
            ['name' => 'Natural Remedy', 'description' => 'Herbal and natural treatment insights.'],
            ['name' => 'Quick Meals', 'description' => 'Fast and healthy recipe ideas.'],
        ];

        foreach ($categories as &$category) {
            $category['created_at'] = now();
            $category['updated_at'] = now();
        }

        BlogCategory::insert($categories);
    }
}
