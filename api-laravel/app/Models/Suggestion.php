<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Suggestion extends Model {
    use HasFactory ,SoftDeletes;

    protected $table = 'suggestions';
    protected $primaryKey = 'article_id';

    protected $fillable = [
        'news',
    ];

    protected $visible = [
        'article_id',
        'news',
    ];
}
