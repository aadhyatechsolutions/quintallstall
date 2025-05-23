<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word, 
            'category_id' => Category::inRandomOrder()->first()->id, 
            'description' => $this->faker->text(200), 
            'image' => $this->faker->imageUrl(640, 480, 'products', true), 
        ];
    }
}
