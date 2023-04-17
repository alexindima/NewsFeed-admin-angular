<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\DbModels\Tag;

class TagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        Tag::factory(10)->create();
    }
}
