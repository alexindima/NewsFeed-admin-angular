<?php

namespace Database\Factories;

use App\DbModels\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition(): array
    {
        return [
            // лучше стоит генерить более уникальные значения для БД, используя флажок more_entropy
            'name' => uniqid('category_', true).$this->faker->unique()->word,
        ];
    }
}
