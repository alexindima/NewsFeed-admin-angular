<?php

namespace Database\Factories;

use App\DbModels\Tag;
use Illuminate\Database\Eloquent\Factories\Factory;

class TagFactory extends Factory
{
    protected $model = Tag::class;

    public function definition(): array
    {
        return [
            'name' => uniqid('tag_').$this->faker->unique()->word,
        ];
    }
}
