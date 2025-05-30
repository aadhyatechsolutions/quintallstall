<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\Role;
use App\Models\Address;
use App\Models\Apmc;
use App\Models\BankAccount;
use App\Models\User;
use App\Models\Wallet;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Paths
        $sourceDir = database_path('seeders/users');
        $destinationDir = public_path('storage/users');

        if (!File::exists($destinationDir)) {
            File::makeDirectory($destinationDir, 0755, true);
        }

        // Utility to get and copy image based on role
        $getProfileImage = function (string $roleSlug): string {
            $sourceDir = database_path('seeders/users');
            $destinationDir = public_path('storage/users');
            $extensions = ['jpg', 'jpeg', 'png'];

            foreach ($extensions as $ext) {
                $filename = "{$roleSlug}.{$ext}";
                $sourcePath = "{$sourceDir}/{$filename}";

                if (File::exists($sourcePath)) {
                    $targetPath = "{$destinationDir}/{$filename}";
                    File::copy($sourcePath, $targetPath);
                    return "users/{$filename}";
                }
            }

            // Fallback if image not found
            return "users/default.jpg";
        };

        // Roles
        $adminRole = Role::where('slug', 'admin')->first();
        $wholesalerRole = Role::where('slug', 'wholesaler')->first();
        $retailerRole = Role::where('slug', 'retailer')->first();
        $deliveryRole = Role::where('slug', 'delivery')->first();
        $userRole = Role::where('slug', 'user')->first();

        // Admin User
        $john = User::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'business_name' => 'Admin Business',
            'phone_number' => '1234567890',
            'email' => 'jason@ui-lib.com',
            'password' => bcrypt('dummyPass'),
            'profile_image' => $getProfileImage('admin'),
            'address_id' => Address::inRandomOrder()->first()->id,
            'bank_account_id' => BankAccount::inRandomOrder()->first()->id,
        ]);
        $john->roles()->attach($adminRole->id);
        $john->apmcs()->attach(Apmc::inRandomOrder()->first()->id);

        // Wholesaler
        $alice = User::create([
            'first_name' => 'Alice',
            'last_name' => 'Smith',
            'business_name' => 'Wholesaler Business',
            'phone_number' => '2345678901',
            'email' => 'alice.smith@wholesaler.com',
            'password' => bcrypt('password'),
            'profile_image' => $getProfileImage('wholesaler'),
            'address_id' => Address::inRandomOrder()->first()->id,
            'bank_account_id' => BankAccount::inRandomOrder()->first()->id,
        ]);
        $alice->roles()->attach($wholesalerRole->id);
        $alice->apmcs()->attach(Apmc::inRandomOrder()->first()->id);
        Wallet::create([
            'user_id' => $alice->id,
            'amount' => 1000.00,
            'status' => 'Active',
        ]);
        // Retailer
        // $bob = User::create([
        //     'first_name' => 'Bob',
        //     'last_name' => 'Johnson',
        //     'business_name' => 'Retailer Business',
        //     'phone_number' => '3456789012',
        //     'email' => 'bob.johnson@retailer.com',
        //     'password' => bcrypt('password'),
        //     'profile_image' => $getProfileImage('retailer'),
        //     'address_id' => Address::inRandomOrder()->first()->id,
        //     'bank_account_id' => BankAccount::inRandomOrder()->first()->id,
        // ]);
        // $bob->roles()->attach($retailerRole->id);
        // $bob->apmcs()->attach(Apmc::inRandomOrder()->first()->id);
        // Wallet::create([
        //     'user_id' => $bob->id,
        //     'amount' => 500.00,
        //     'status' => 'Active',
        // ]);
        // Regular User
        $charlie = User::create([
            'first_name' => 'Charlie',
            'last_name' => 'Davis',
            'business_name' => 'User Business',
            'phone_number' => '4567890123',
            'email' => 'charlie.davis@user.com',
            'password' => bcrypt('password'),
            'profile_image' => $getProfileImage('user'),
            'address_id' => Address::inRandomOrder()->first()->id,
            'bank_account_id' => BankAccount::inRandomOrder()->first()->id,
        ]);
        $charlie->roles()->attach($userRole->id);
        $charlie->apmcs()->attach(Apmc::inRandomOrder()->first()->id);

        // Delivery
        $david = User::create([
            'first_name' => 'David',
            'last_name' => 'Lee',
            'business_name' => 'Delivery Business',
            'phone_number' => '5678901234',
            'email' => 'david.lee@delivery.com',
            'password' => bcrypt('password'),
            'profile_image' => $getProfileImage('delivery'),
            'address_id' => Address::inRandomOrder()->first()->id,
            'bank_account_id' => BankAccount::inRandomOrder()->first()->id,
        ]);
        $david->roles()->attach($deliveryRole->id);
        $david->apmcs()->attach(Apmc::inRandomOrder()->first()->id);

        $david1 = User::create([
            'first_name' => 'David1',
            'last_name' => 'Lee1',
            'business_name' => 'Delivery Business1',
            'phone_number' => '5678901235',
            'email' => 'david.lee@delivery.comm',
            'password' => bcrypt('password'),
            'profile_image' => $getProfileImage('delivery'),
            'address_id' => Address::inRandomOrder()->first()->id,
            'bank_account_id' => BankAccount::inRandomOrder()->first()->id,
        ]);
        $david1->roles()->attach($deliveryRole->id);
        $david1->apmcs()->attach(Apmc::inRandomOrder()->first()->id);
    }
}
