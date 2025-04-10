<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Role;
use App\Models\Address;
use App\Models\Apmc;
use App\Models\BankAccount;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Retrieve the roles by their slugs
        $adminRole = Role::where('slug', 'admin')->first();
        $wholesalerRole = Role::where('slug', 'wholesaler')->first();
        $retailerRole = Role::where('slug', 'retailer')->first();
        $deliveryRole = Role::where('slug', 'delivery')->first(); // Fetch the delivery role
        $userRole = Role::where('slug', 'user')->first();

        // Create the users
        $john = User::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'business_name' => 'Admin Business',
            'phone_number' => '1234567890',
            'email' => 'jason@ui-lib.com',
            'password' => bcrypt('dummyPass'),
            'profile_image' => 'profile1.jpg',
            'address_id' => Address::inRandomOrder()->first()->id, // Random address ID
            'bank_account_id' => BankAccount::inRandomOrder()->first()->id, // Random bank account ID
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Assign roles and apmcs using pivot tables
        $john->roles()->attach($adminRole->id);
        $john->apmcs()->attach(Apmc::inRandomOrder()->first()->id);

        $alice = User::create([
            'first_name' => 'Alice',
            'last_name' => 'Smith',
            'business_name' => 'Wholesaler Business',
            'phone_number' => '2345678901',
            'email' => 'alice.smith@wholesaler.com',
            'password' => bcrypt('password'),
            'profile_image' => 'profile2.jpg',
            'address_id' => Address::inRandomOrder()->first()->id,
            'bank_account_id' => BankAccount::inRandomOrder()->first()->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Assign roles and apmcs using pivot tables
        $alice->roles()->attach($wholesalerRole->id);
        $alice->apmcs()->attach(Apmc::inRandomOrder()->first()->id);

        $bob = User::create([
            'first_name' => 'Bob',
            'last_name' => 'Johnson',
            'business_name' => 'Retailer Business',
            'phone_number' => '3456789012',
            'email' => 'bob.johnson@retailer.com',
            'password' => bcrypt('password'),
            'profile_image' => 'profile3.jpg',
            'address_id' => Address::inRandomOrder()->first()->id,
            'bank_account_id' => BankAccount::inRandomOrder()->first()->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Assign roles and apmcs using pivot tables
        $bob->roles()->attach($retailerRole->id);
        $bob->apmcs()->attach(Apmc::inRandomOrder()->first()->id);

        $charlie = User::create([
            'first_name' => 'Charlie',
            'last_name' => 'Davis',
            'business_name' => 'User Business',
            'phone_number' => '4567890123',
            'email' => 'charlie.davis@user.com',
            'password' => bcrypt('password'),
            'profile_image' => 'profile4.jpg',
            'address_id' => Address::inRandomOrder()->first()->id,
            'bank_account_id' => BankAccount::inRandomOrder()->first()->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Assign roles and apmcs using pivot tables
        $charlie->roles()->attach($userRole->id);
        $charlie->apmcs()->attach(Apmc::inRandomOrder()->first()->id);

        // Create a user with the delivery role
        $david = User::create([
            'first_name' => 'David',
            'last_name' => 'Lee',
            'business_name' => 'Delivery Business',
            'phone_number' => '5678901234',
            'email' => 'david.lee@delivery.com',
            'password' => bcrypt('password'),
            'profile_image' => 'profile5.jpg',
            'address_id' => Address::inRandomOrder()->first()->id,
            'bank_account_id' => BankAccount::inRandomOrder()->first()->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Assign the delivery role to David and attach an APMC
        $david->roles()->attach($deliveryRole->id);
        $david->apmcs()->attach(Apmc::inRandomOrder()->first()->id);
    }
}
