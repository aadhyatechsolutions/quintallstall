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
            $table->text('description'); 
            $table->decimal('price', 8, 2);
            $table->decimal('quantity', 8, 2)->default(0);
            $table->enum('unit', ['kg', 'gram', 'quintal'])->default('kg');
            $table->enum('stock_level', ['in_stock', 'out_of_stock', 'low_stock'])->default('in_stock');

            $table->string('image')->nullable(); 
            
            $table->unsignedBigInteger('category_id'); 
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade'); 

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

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
