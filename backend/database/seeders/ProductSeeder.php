<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Role;
use App\Models\User;
use App\Models\Apmc;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

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

        $apmcs = Apmc::all();
        if ($apmcs->isEmpty()) {
            echo "⚠️  No APMCs found! Please seed the apmcs table first.\n";
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

        $productionPhrases = [
            'grown in the lush fields of the countryside',
            'produced using sustainable farming techniques',
            'harvested at peak ripeness',
            'carefully cultivated in local farms',
            'manufactured using eco-friendly methods',
            'produced under strict quality control',
            'sourced directly from small-scale farmers',
            'gathered with a focus on quality and sustainability',
        ];

        $userCount = $users->count();
        $userIndex = 0;

        foreach ($images as $imagePath) {
            $fileName = basename($imagePath);
            $nameWithoutExt = pathinfo($fileName, PATHINFO_FILENAME);
            $extension = pathinfo($fileName, PATHINFO_EXTENSION);

            $productName = ucfirst($nameWithoutExt);
            $randomPhrase = $phrases[array_rand($phrases)];
            $description = $productName . ' ' . $randomPhrase;

            $targetPath = $destinationDir . '/' . $fileName;
            File::copy($imagePath, $targetPath);

            $user = $users[$userIndex];
            $userIndex = ($userIndex + 1) % $userCount;

            // Generate a price
            $price = rand(10, 100) . '.99';

            // Generate discount price which is less than the original price
            $discountPrice = rand(5, (int) ($price - 1)) . '.99'; // Ensure discount price is less than price

            // Quantity between 0 and 100
            $quantity = rand(0, 100);

            // Random production description
            $productionDescription = $productionPhrases[array_rand($productionPhrases)];

            Product::create([
                'name' => $productName,
                'description' => $description,
                'price' => $price,
                'seller_id' => $user->id,
                'category_id' => rand(1, 6),
                'image' => 'products/' . $fileName,

                // New fields
                'sku' => strtoupper(Str::random(8)),
                'apmc_id' => $apmcs->random()->id,
                'production' => $productionDescription, // Set production as a text description
                'quality' => collect(['a', 'b', 'c'])->random(),
                'ud_field' => 'Additional product details or custom notes here.',
                'return_policy' => 'Returns accepted within 7 days with receipt.',
                'feature_image' => 'products/' . $fileName, // using same image
                'discount_price' => $discountPrice, // Ensure discount price is less than price
                'quantity' => $quantity, // Set quantity between 0 and 100
            ]);
        }

        echo "✅ Seeded " . count($images) . " products with enhanced fields.\n";
    }
}
