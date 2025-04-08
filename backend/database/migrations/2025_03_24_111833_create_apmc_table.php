<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('apmcs', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->string('name'); // Name of the APMC
            $table->string('location'); // Location
            $table->string('area'); // Area
            $table->string('village'); // Village
            $table->string('taluka'); // Taluka
            $table->string('city'); // City
            $table->string('state'); // State
            $table->string('pincode'); // Pincode
            $table->string('image')->nullable(); // Optional image field
            $table->timestamps(); // Created at and updated at timestamps
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('apmcs');
    }
};
