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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('buyer_id');
            $table->foreign('buyer_id')->references('id')->on('users')->onDelete('cascade');
            $table->enum('order_status', ['pending', 'accepted', 'completed', 'cancelled', 'failed'])->default('pending');

            $table->unsignedBigInteger('delivery_user_id')->nullable();
            $table->foreign('delivery_user_id')->references('id')->on('users')->onDelete('set null');
            
            $table->decimal('total_amount', 10, 2);
            $table->decimal('wage_cost', 10, 2)->default(0);
            $table->decimal('platform_cost', 10, 2)->default(0);
            $table->decimal('tax', 10, 2)->default(0);
            $table->text('shipping_address');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
