<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class ArticleTagSeeder extends Seeder
{
    public function run()
    {
        $articles = Article::all();
        $tags = Tag::all();

        foreach ($articles as $article) {
            $tag_ids = $tags->random(rand(1, 5))->pluck('id');
            foreach ($tag_ids as $tag_id) {
                $article->tags()->attach($tag_id);
            }
        }
    }
}
