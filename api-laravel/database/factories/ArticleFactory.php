<?php

namespace Database\Factories;

use App\DbModels\Article;
use App\DbModels\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class ArticleFactory extends Factory
{
    protected $model = Article::class;

    public function definition(): array
    {
        return [
            'main_title' => $this->faker->text(200),
            'second_title' => $this->faker->text(200),
            'photo_pass' => $this->faker->text(100),
            'photo_text' => $this->faker->text(50),
            'body' => $this->faker->text,
            'category_id' => fn() => Category::factory()->create()->id,
            'likes' => $this->faker->numberBetween(1, 9999),
            'dislikes' => $this->faker->numberBetween(1, 9999),
        ];
    }
}
