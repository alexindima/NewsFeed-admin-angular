<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Category;
class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            ['name' => 'Technology'],
            ['name' => 'Sports'],
            ['name' => 'Politics'],
            ['name' => 'Entertainment'],
            ['name' => 'Food'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
