<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str; // Import the Str class

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Define category data
        $categories = [
            ['name' => 'Electronics', 'description' => 'Devices and gadgets for daily use'],
            ['name' => 'Fashion', 'description' => 'Clothing, accessories, and fashion items'],
            ['name' => 'Home & Kitchen', 'description' => 'Furniture and home appliances'],
            ['name' => 'Sports', 'description' => 'Sporting goods and equipment'],
            ['name' => 'Books', 'description' => 'Variety of books for all ages'],
        ];

        foreach ($categories as $categoryData) {
            // Define the URL for the image (random image for each category)
            $imageUrl = 'https://picsum.photos/640/480?random=' . rand(1, 1000); // Random image from Picsum
            $imageName = 'category_' . Str::slug($categoryData['name']) . '.jpg'; // Use Str::slug() to create a slug from category name

            // Path where the image will be saved in the public storage folder
            $imagePath = public_path('storage/categories/' . $imageName);

            // Initialize cURL session to download the image
            $ch = curl_init($imageUrl);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return the content as a string
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Follow redirects
            curl_setopt($ch, CURLOPT_TIMEOUT, 30); 
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

            // Execute the cURL session
            $imageContent = curl_exec($ch);
            $curlError = curl_error($ch);

            // Check if there was an error with the cURL request
            if ($curlError) {
                echo "Error downloading image: $curlError\n";
                curl_close($ch);
                return;
            }

            // Save the image content to the specified file path
            file_put_contents($imagePath, $imageContent);

            // Close the cURL session
            curl_close($ch);

            // Create the category in the database
            Category::create([
                'name' => $categoryData['name'],
                'description' => $categoryData['description'],
                'image' => 'categories/' . $imageName, // Store the relative path of the image
            ]);
        }
    }
}
