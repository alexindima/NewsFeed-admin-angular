<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Suggestion extends Model {
    use SoftDeletes;

    protected $table = 'suggestions';
    protected $primaryKey = 'article_id';

    protected $fillable = [
        'article_id',
        'news',
    ];

    protected $visible = [
        'article_id',
        'news',
    ];
}
