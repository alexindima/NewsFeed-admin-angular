<?php

namespace Database\Factories;

use App\Models\Article;
use App\Models\Category;
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

            // для целостности БД нужно, чтобы здесь создавалась реальная категория
            // 'category_id' => fn() => Category::factory()->create()->id
            'category_id' => $this->faker->numberBetween(1, 9999),
            'likes' => $this->faker->numberBetween(1, 9999),
            'dislikes' => $this->faker->numberBetween(1, 9999),
        ];
    }
}
