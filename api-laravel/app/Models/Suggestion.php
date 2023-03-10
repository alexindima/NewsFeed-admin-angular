<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Suggestion extends Model {
    protected $table = 'suggestions';

    protected $fillable = [
        'article_id',
        'news',
    ];

    protected $visible = [
        'article_id',
        'news',
    ];
}
