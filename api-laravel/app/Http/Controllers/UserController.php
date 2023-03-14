<?php

namespace App\Http\Controllers;

use App\Models\Article;

class UserController extends Controller {
    public function get($index) {
        $article = Article::find($index);
        dump($article);
        return $article;
    }

    public function create() {
        Article::create();
    }
}
