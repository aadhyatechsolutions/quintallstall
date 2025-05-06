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
        Schema::create('products', function (Blueprint $table) {
            $table->id(); 
            $table->string('name'); 
            $table->string('sku')->nullable();
            $table->text('description'); 
            $table->decimal('price', 8, 2);
            $table->decimal('discount_price', 8, 2)->nullable();
            $table->integer('quantity')->default(0);
            $table->enum('unit', ['kg', 'gram', 'quintal'])->default('kg');
            $table->enum('stock_level', ['in_stock', 'out_of_stock', 'low_stock'])->default('in_stock');
            $table->string('production')->nullable();
            $table->string('ud_field')->nullable();
            $table->enum('quality', ['a', 'b', 'c'])->nullable();
            $table->text('return_policy')->nullable();
            $table->string('image')->nullable(); 
            $table->string('feature_image')->nullable();
            
            $table->unsignedBigInteger('apmc_id')->nullable(); // Foreign key column
            $table->foreign('apmc_id')->references('id')->on('apmcs')->onDelete('set null');

            $table->unsignedBigInteger('category_id'); 
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade'); 

            $table->unsignedBigInteger('seller_id');
            $table->foreign('seller_id')->references('id')->on('users')->onDelete('cascade');

            $table->string('status')->default('active');
            
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
