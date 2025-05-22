<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\SpecialOffer;

class SpecialOfferSeeder extends Seeder
{
    public function run(): void
    {
        $sourceDir = database_path('seeders/specialOffers');
        $destinationDir = public_path('storage/special_offers');

        if (!File::exists($destinationDir)) {
            File::makeDirectory($destinationDir, 0755, true);
        }

        $offers = [
            [
                'title' => 'Mega Summer Sale',
                'second_title' => 'Up to 50% Off',
                'short_description' => 'Don’t miss out on our exclusive summer discounts!',
                'shop_button_text' => 'Explore Deals',
                'image' => 'special_offers/special_offer1.jpg',
                'source_image' => 'special_offer1.jpg'
            ],
            [
                'title' => 'Fresh Arrival Offers',
                'second_title' => 'Limited Stocks',
                'short_description' => 'New stock just arrived with exciting prices.',
                'shop_button_text' => 'Shop Fresh',
                'image' => 'special_offers/special_offer2.png',
                'source_image' => 'special_offer2.png'
            ]
        ];

        foreach ($offers as $offer) {
            $sourceImage = $sourceDir . '/' . $offer['source_image'];
            $destinationImage = $destinationDir . '/' . $offer['source_image'];

            if (File::exists($sourceImage)) {
                File::copy($sourceImage, $destinationImage);
            }

            SpecialOffer::create([
                'title' => $offer['title'],
                'second_title' => $offer['second_title'],
                'short_description' => $offer['short_description'],
                'shop_button_text' => $offer['shop_button_text'],
                'image' => $offer['image']
            ]);
        }
    }
}
