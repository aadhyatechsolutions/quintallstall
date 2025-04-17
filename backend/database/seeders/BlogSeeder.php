<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\Blog;

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
                "tags" => ["Vegetables", "Health", "Spinach"]
            ],
            [
                "title" => "Carrots: The Crunchy Secret to Better Vision",
                "excerpt" => "Discover how carrots support your eyes and overall health...",
                "image" => "carrots.jpg",
                "author" => "John Root",
                "tags" => ["Carrots", "Nutrition", "Vegetables"]
            ],
            [
                "title" => "The Power of Broccoli: Benefits You Didn't Know",
                "excerpt" => "Broccoli is more than just a green veggie—it's a superfood...",
                "image" => "broccoli.jpg",
                "author" => "Nina Leaf",
                "tags" => ["Broccoli", "Healthy Eating", "Veggie Facts"]
            ],
            [
                "title" => "Why Tomatoes Are the Juiciest Way to Stay Healthy",
                "excerpt" => "Tomatoes offer more than flavor—they’re rich in antioxidants...",
                "image" => "tomatoes.jpg",
                "author" => "Liam Fields",
                "tags" => ["Tomatoes", "Lycopene", "Healthy"]
            ],
            [
                "title" => "Cucumbers and Hydration: The Ultimate Summer Veggie",
                "excerpt" => "Cucumbers are cooling, refreshing, and loaded with water...",
                "image" => "cucumber.jpg",
                "author" => "Sophie Waters",
                "tags" => ["Cucumber", "Summer", "Hydration"]
            ],
            [
                "title" => "How Bell Peppers Boost Your Immune System",
                "excerpt" => "Colorful bell peppers are rich in Vitamin C and other nutrients...",
                "image" => "bell_pepper.jpg",
                "author" => "Dr. Herb Green",
                "tags" => ["Bell Peppers", "Immunity", "Vegetables"]
            ],
            [
                "title" => "The Truth About Potatoes: Carbs, Myths, and Benefits",
                "excerpt" => "Are potatoes really bad for you? Let’s explore the science...",
                "image" => "potatoes.jpg",
                "author" => "Anna Root",
                "tags" => ["Potatoes", "Carbs", "Myth Busting"]
            ],
            [
                "title" => "Onions: Nature’s Natural Antibiotic?",
                "excerpt" => "Learn why onions have been used for centuries as healing foods...",
                "image" => "onions.jpg",
                "author" => "Henry Sharp",
                "tags" => ["Onions", "Natural Remedy", "Vegetables"]
            ],
            [
                "title" => "Beets and Blood Health: What You Should Know",
                "excerpt" => "Beetroots are amazing for blood flow and energy levels...",
                "image" => "beets.jpg",
                "author" => "Ruby Garden",
                "tags" => ["Beets", "Blood Health", "Energy"]
            ],
            [
                "title" => "Zucchini Recipes You Can Make in Under 10 Minutes",
                "excerpt" => "Quick, tasty, and healthy zucchini ideas for any meal...",
                "image" => "zucchini.jpg",
                "author" => "Chef Zuke",
                "tags" => ["Zucchini", "Quick Meals", "Vegetables"]
            ],
        ];

        $sourceDir = database_path('seeders/blogs');
        $destinationDir = public_path('storage/blogs');

        if (!File::exists($destinationDir)) {
            File::makeDirectory($destinationDir, 0755, true);
        }

        foreach ($blogs as $index => $blog) {
            $imageFile = $blog['image'];
            $sourcePath = $sourceDir . '/' . $imageFile;
            $targetPath = $destinationDir . '/' . $imageFile;

            // Copy the image if it exists
            if (File::exists($sourcePath)) {
                File::copy($sourcePath, $targetPath);
            } else {
                echo "⚠️ Image not found: {$imageFile}\n";
            }

            // Create blog record
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
                'tags' => $blog['tags']
            ]);
        }
    }
}
