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
        Schema::create('sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Link to user
            $table->string('device')->nullable(); // Device name
            $table->string('ip_address')->nullable(); // IP address
            $table->string('browser')->nullable(); // Browser name
            $table->timestamp('last_active_at')->useCurrent(); // Last activity time
            $table->string('token_id')->nullable(); // Token ID to identify each session
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessions');
    }
};
