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
        Schema::create('taxes', function (Blueprint $table) {
            $table->id();
            $table->decimal('cgst', 5, 2)->default(0); // e.g., 9.00%
            $table->decimal('sgst', 5, 2)->default(0); // e.g., 9.00%
            $table->decimal('igst', 5, 2)->default(0); // e.g., 18.00%
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('taxes');
    }
};
