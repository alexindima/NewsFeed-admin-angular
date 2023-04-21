<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(\Database\Seeders\CategoriesTableSeeder::class);
        $this->call(TagsTableSeeder::class);
        $this->call(ArticlesTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(ArticleTagSeeder::class);
        $this->call(UserCategorySeeder::class);
        $this->call(UserTagSeeder::class);

    }
}
