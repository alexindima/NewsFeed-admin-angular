<?php

namespace Database\Seeders;

use App\DbModels\Article;
use App\DbModels\Tag;
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
            // fyi: еще есть функция random_int() она генерит рандомные значения получше, но и работает дольше
            // для сидера в целом использовать rand() хоть и норм, но я бы предпочёл пользоваться только одним способом
            $tag_ids = $tags->random(rand(1, 5))->pluck('id');
            foreach ($tag_ids as $tag_id) {
                $article->tags()->attach($tag_id);
            }
        }
    }
}
