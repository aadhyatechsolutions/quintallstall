<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $wholesalerRole = Role::where('slug', 'wholesaler')->first();
        $retailerRole = Role::where('slug', 'retailer')->first();

        if (!$wholesalerRole || !$retailerRole) {
            echo "⚠️  Wholesaler or Retailer roles are missing!\n";
            return;
        }

        $users = User::whereHas('roles', function ($query) use ($wholesalerRole, $retailerRole) {
            $query->whereIn('roles.id', [$wholesalerRole->id, $retailerRole->id]);
        })->get();

        if ($users->isEmpty()) {
            echo "⚠️  No users with wholesaler or retailer roles found!\n";
            return;
        }

        $sourceDir = database_path('seeders/products');
        $destinationDir = public_path('storage/products');

        if (!File::exists($destinationDir)) {
            File::makeDirectory($destinationDir, 0755, true);
        }

        $images = File::glob($sourceDir . '/*.{jpg,jpeg,png}', GLOB_BRACE);

        if (empty($images)) {
            echo "⚠️  No images found in database/seeders/products!\n";
            return;
        }

        $phrases = [
            'is fresh and tasty',
            'is organically grown',
            'is packed with nutrients',
            'comes straight from the farm',
            'is hand-picked for quality',
            'is perfect for healthy meals',
            'is loved by chefs everywhere',
            'is grown with care',
        ];

        $userCount = $users->count();
        $userIndex = 0;

        foreach ($images as $imagePath) {
            $fileName = basename($imagePath); // e.g., apple.jpg
            $nameWithoutExt = pathinfo($fileName, PATHINFO_FILENAME); // e.g., apple
            $extension = pathinfo($fileName, PATHINFO_EXTENSION);

            // Capitalize first letter
            $productName = ucfirst($nameWithoutExt);

            // Random phrase
            $randomPhrase = $phrases[array_rand($phrases)];

            // Final description
            $description = $productName . ' ' . $randomPhrase;

            // Copy image to public directory
            $targetPath = $destinationDir . '/' . $fileName;
            File::copy($imagePath, $targetPath);

            // Assign product to a user in round-robin
            $user = $users[$userIndex];
            $userIndex = ($userIndex + 1) % $userCount;

            Product::create([
                'name' => $productName,
                'description' => $description,
                'price' => rand(10, 100) . '.99',
                'seller_id' => $user->id,
                'category_id' => rand(1, 6),
                'image' => 'products/' . $fileName,
            ]);
        }

        echo "✅ Seeded " . count($images) . " products with enhanced descriptions.\n";
    }
}
