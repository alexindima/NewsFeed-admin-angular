<?php

namespace App\Http\Controllers;

use App\Models\Article;

class ArticleController extends BaseController {

    public function __construct()
    {
        parent::__construct(Article::class);
    }


}
