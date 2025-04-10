<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Apmc>
 */
class ApmcFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company . ' APMC',
            'location' => $this->faker->address,
            'area' => $this->faker->word,
            'village' => $this->faker->citySuffix,
            'taluka' => $this->faker->word,
            'city' => $this->faker->city,
            'state' => $this->faker->state,
            'pincode' => $this->faker->postcode,
            'image' => $this->faker->imageUrl(640, 480, 'business', true),
        ];
    }
}
