<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade'); // FK to orders table
            $table->foreignId('product_id')->constrained()->onDelete('cascade'); // FK to products table (assumed)
            $table->integer('quantity');
            $table->decimal('price', 10, 2); // Price of a single item at the time of purchase
            $table->decimal('total', 10, 2); // Quantity * Price
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
