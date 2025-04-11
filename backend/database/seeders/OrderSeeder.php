<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ShippingDetail;
use App\Models\Payment;
use Faker\Factory as Faker;

class OrderSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 10) as $index) {
            // Create an order
            $order = Order::create([
                'user_id' => 1, // Assuming user exists
                'order_status' => $faker->randomElement(['pending', 'completed', 'cancelled', 'failed']),
                'total_amount' => 0, // Placeholder, will be updated later
                'shipping_address' => $faker->address,
            ]);

            $total = 0;

            // Create order items
            foreach (range(1, rand(1, 3)) as $itemIndex) {
                $quantity = $faker->numberBetween(1, 5);
                $price = $faker->randomFloat(2, 10, 100);
                $itemTotal = $quantity * $price;

                $total += $itemTotal;

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => 1, // Assuming product exists
                    'quantity' => $quantity,
                    'price' => $price,
                    'total' => $itemTotal,
                ]);
            }

            // Update the order's total
            $order->update(['total_amount' => $total]);

            // Create shipping detail
            $shippingStatus = $faker->randomElement(['pending', 'shipped', 'delivered', 'failed']);
            $shippedAt = in_array($shippingStatus, ['shipped', 'delivered']) ? $faker->dateTimeBetween('-5 days', '-1 days') : null;
            $deliveredAt = $shippingStatus === 'delivered' ? $faker->dateTimeBetween('-1 days', 'now') : null;

            ShippingDetail::create([
                'order_id' => $order->id,
                'shipping_method' => $faker->randomElement(['standard', 'express']),
                'tracking_number' => strtoupper($faker->bothify('TRK#######')),
                'shipping_status' => $shippingStatus,
                'shipped_at' => $shippedAt,
                'delivered_at' => $deliveredAt,
            ]);
            
            $paymentStatus = $faker->randomElement(['pending', 'success', 'failed', 'refunded']);

            Payment::create([
                'order_id' => $order->id,
                'payment_method' => $faker->randomElement(['card', 'upi', 'cod', 'wallet', 'netbanking']),
                'amount' => $total,
                'transaction_id' => strtoupper($faker->bothify('TXN##########')),
                'payment_status' => $paymentStatus,
                'paid_at' => $faker->dateTimeBetween('-1 month', 'now'),
                'error_message' => $paymentStatus === 'failed' ? $faker->sentence : null,
            ]);

        }
    }
}
