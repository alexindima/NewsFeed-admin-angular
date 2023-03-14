<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArticlesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Define some sample data for the "articles" table
        $articles = [
            [
                'main_title' => 'Article 1 Main Title',
                'second_title' => 'Article 1 Second Title',
                'photo_pass' => 'path/to/photo1.jpg',
                'photo_text' => 'Photo 1 Text',
                'body' => 'This is the body of article 1',
                'category' => 1,
            ],
            [
                'main_title' => 'Article 2 Main Title',
                'second_title' => 'Article 2 Second Title',
                'photo_pass' => 'path/to/photo2.jpg',
                'photo_text' => 'Photo 2 Text',
                'body' => 'This is the body of article 2',
                'category' => 2,
            ],
            [
                'main_title' => 'Article 3 Main Title',
                'second_title' => 'Article 3 Second Title',
                'photo_pass' => 'path/to/photo3.jpg',
                'photo_text' => 'Photo 3 Text',
                'body' => 'This is the body of article 3',
                'category' => 1,
            ],
        ];

        // Insert the sample data into the "articles" table
        DB::table('articles')->insert($articles);
    }
}
