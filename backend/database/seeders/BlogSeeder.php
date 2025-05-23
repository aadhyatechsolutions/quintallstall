<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\Blog;
use App\Models\BlogCategory;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        $blogs = [
            [
                "title" => "5 Reasons Why Fresh Spinach Should Be in Your Diet",
                "excerpt" => "Spinach is a powerhouse of nutrients and perfect for daily meals...",
                "image" => "spinach.jpg",
                "author" => "Emily Green",
                "tags" => ["Vegetables", "Health", "Spinach"],
                "category" => "Health"
            ],
            [
                "title" => "Carrots: The Crunchy Secret to Better Vision",
                "excerpt" => "Discover how carrots support your eyes and overall health...",
                "image" => "carrots.jpg",
                "author" => "John Root",
                "tags" => ["Carrots", "Nutrition", "Vegetables"],
                "category" => "Nutrition"
            ],
            // ... other blogs ...
            [
                "title" => "Zucchini Recipes You Can Make in Under 10 Minutes",
                "excerpt" => "Quick, tasty, and healthy zucchini ideas for any meal...",
                "image" => "zucchini.jpg",
                "author" => "Chef Zuke",
                "tags" => ["Zucchini", "Quick Meals", "Vegetables"],
                "category" => "Quick Meals"
            ],
        ];

        $sourceDir = database_path('seeders/blogs');
        $destinationDir = public_path('storage/blogs');

        if (!File::exists($destinationDir)) {
            File::makeDirectory($destinationDir, 0755, true);
        }

        foreach ($blogs as $index => $blog) {
            $category = BlogCategory::where('name', $blog['category'])->first();

            if (!$category) {
                echo "❌ Category not found: {$blog['category']} — skipping blog: {$blog['title']}\n";
                continue;
            }

            $imageFile = $blog['image'];
            $sourcePath = $sourceDir . '/' . $imageFile;
            $targetPath = $destinationDir . '/' . $imageFile;

            if (File::exists($sourcePath)) {
                File::copy($sourcePath, $targetPath);
            } else {
                echo "⚠️ Image not found: {$imageFile}\n";
            }

            Blog::create([
                'title' => $blog['title'],
                'excerpt' => $blog['excerpt'],
                'content' => [
                    'introduction' => "This article covers why {$blog['title']} matters.",
                    'features' => [
                        "Fresh and organic",
                        "Locally sourced and chemical-free",
                        "Loaded with essential nutrients"
                    ],
                    'conclusion' => "Adding this veggie to your diet can bring surprising health benefits."
                ],
                'image' => 'blogs/' . $imageFile,
                'date' => now()->subDays(10 - $index)->toDateString(),
                'author' => $blog['author'],
                'read_time' => rand(3, 7) . ' min',
                'tags' => $blog['tags'],
                'blog_category_id' => $category->id,
            ]);
        }
    }
}
