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
        $wholesalerRole = Role::where('slug', 'wholesaler')->first();
        $retailerRole = Role::where('slug', 'retailer')->first();
   
        if (!$wholesalerRole || !$retailerRole) {
            echo "Wholesaler or Retailer roles are missing!";
            return;
        }
        
        $users = User::whereHas('roles', function ($query) use ($wholesalerRole, $retailerRole) {
            $query->whereIn('roles.id', [$wholesalerRole->id, $retailerRole->id]);
        })->get();
        
        if ($users->isEmpty()) {
            echo "No users with wholesaler or retailer role found!";
            return;
        }
        
        foreach ($users as $user) {            
            for ($i = 1; $i <= 5; $i++) {

                // Define the URL for the image
                $imageUrl = 'https://picsum.photos/640/480?random=' . rand(1, 1000); // Add randomness to get different images
                $imageName = 'product_' . $user->id . '_' . $i . '.jpg'; // Name the image based on the user ID and product index

                // Path where the image will be saved in the public storage folder
                $imagePath = public_path('storage/products/' . $imageName);

                // Initialize cURL session
                $ch = curl_init($imageUrl);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  // Return the content as a string
                curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);  // Follow redirects
                curl_setopt($ch, CURLOPT_TIMEOUT, 30);  
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

                // Execute cURL session and get the image content
                $imageContent = curl_exec($ch);
                $curlError = curl_error($ch);

                // Check if there was a cURL error
                if ($curlError) {
                    echo "Error downloading image: $curlError\n";
                    curl_close($ch);
                    return;
                }

                // Save the image content to the specified path
                file_put_contents($imagePath, $imageContent);

                // Close the cURL session
                curl_close($ch);

                // Create the product in the database
                Product::create([
                    'name' => 'Product ' . $i . ' for ' . $user->first_name,
                    'description' => 'Description for Product ' . $i,
                    'price' => rand(10, 100) . '.99',  
                    'seller_id' => $user->id,  
                    'category_id' => rand(1, 6), 
                    'image' => 'products/' . $imageName, // Store the relative path of the image
                ]);
            }
        }
    }
}
