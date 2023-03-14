<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Tag;
class TagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tags = [
            ['name' => 'Technology'],
            ['name' => 'Sports'],
            ['name' => 'Politics'],
            ['name' => 'Entertainment'],
            ['name' => 'Food'],
        ];

        foreach ($tags as $tag) {
            Tag::create($tag);
        }
    }
}
