<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model {
    protected $table = 'articles';

    protected $fillable = [
        'article_id',
        'main_title',
        'second_title',
        'photo_pass',
        'photo_text',
        'body',
        'category',
    ];

    protected $visible = [
        'article_id',
        'main_title',
        'second_title',
        'photo_pass',
        'photo_text',
        'body',
        'category',
    ];
}
