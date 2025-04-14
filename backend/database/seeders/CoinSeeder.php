<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Coin;
use Illuminate\Support\Str;

class CoinSeeder extends Seeder
{
    public function run()
    {
        $coins = [
            [
                'name' => 'Gold Coin',
                'description' => 'Premium currency used for exclusive items.',
                'value' => 100.00,
                'status' => 'active',
            ],
            [
                'name' => 'Silver Coin',
                'description' => 'Standard currency used for regular purchases.',
                'value' => 10.00,
                'status' => 'active',
            ],
            [
                'name' => 'Bronze Coin',
                'description' => 'Basic coin for small transactions.',
                'value' => 1.00,
                'status' => 'inactive',
            ],
        ];

        foreach ($coins as $coin) {
            Coin::create([
                'name' => $coin['name'],
                'slug' => Str::slug($coin['name']),
                'description' => $coin['description'],
                'value' => $coin['value'],
                'status' => $coin['status'],
            ]);
        }
    }
}
