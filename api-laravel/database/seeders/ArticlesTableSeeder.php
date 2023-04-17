<?php

namespace Database\Seeders;

use App\DbModels\Article;
use App\DbModels\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class ArticlesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $categoryIds = Category::pluck('id')->all();

        Article::factory(10)->create([
            'category_id' => function () use ($categoryIds) {
                return Arr::random($categoryIds);
            },
        ]);
    }
}
