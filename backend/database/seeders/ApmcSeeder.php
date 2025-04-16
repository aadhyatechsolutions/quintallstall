<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use App\Models\Apmc;

class ApmcSeeder extends Seeder
{
    public function run(): void
    {
        $sourceDir = database_path('seeders/apmcs');
        $targetDir = public_path('storage/apmc_images');

        // Make sure the target directory exists
        if (!File::exists($targetDir)) {
            File::makeDirectory($targetDir, 0755, true);
        }

        $apmcs = [
            [
                "name" => "Sardar Patel Market Yard - Jamalpur",
                "location" => "Vegetable market, Jamalpur, Ashok Bhatt Fly Over Bridge, Calico Mills, Jamalpur, Ahmedabad, Gujarat, India",
                "area" => "Ashok Bhatt Fyover, Callico Mills",
                "village" => "Jamalpur",
                "taluka" => "Ahmedabad",
                "city" => "Ahmedabad",
                "state" => "Gujarat",
                "pincode" => "380022",
                "image" => "saurastra market.jpg"
            ],
            [
                "name" => "Kalupur Vegetable Market",
                "location" => "APMC Market, Kalupur, Sanklit Nagar, Juhapura, Ahmedabad, Gujarat, India",
                "area" => "",
                "village" => "",
                "taluka" => "",
                "city" => "Ahmedabad",
                "state" => "Gujarat",
                "pincode" => "380005",
                "image" => "sardar patel market.jpg"
            ],
            [
                "name" => "Jamalpur Flower Market",
                "location" => "JamalPur Flower Market, Ashok Bhatt Fly Over Bridge, Calico Mills, Behrampura, Ahmedabad, Gujarat, India",
                "area" => "Ashok Bhatt Fly Over Bridge, Calico Mills",
                "village" => "Behrampura",
                "taluka" => "Ahmedabad",
                "city" => "Ahmedabad",
                "state" => "Gujarat",
                "pincode" => "380001",
                "image" => "cheeman bhai market.jpg"
            ],
            [
                "name" => "Naroda Fruits Market",
                "location" => "Naroda Fruit Market, Memco, D Colony, Ahmedabad, Gujarat, India",
                "area" => "Memco, D Colony",
                "village" => "Ahmedabad",
                "taluka" => "Ahmedabad",
                "city" => "Ahmedabad",
                "state" => "Gujarat",
                "pincode" => "380025",
                "image" => "aadesh market.jpg"
            ]
        ];

        foreach ($apmcs as $apmc) {
            $imageFile = $apmc['image'];

            if ($imageFile && File::exists($sourceDir . '/' . $imageFile)) {
                $uniqueName = time() . '_' . Str::slug(pathinfo($imageFile, PATHINFO_FILENAME)) . '.' . pathinfo($imageFile, PATHINFO_EXTENSION);
                File::copy($sourceDir . '/' . $imageFile, $targetDir . '/' . $uniqueName);
                $apmc['image'] = 'storage/apmc_images/' . $uniqueName;
            } else {
                $apmc['image'] = null;
            }

            Apmc::create($apmc);
        }
    }
}
