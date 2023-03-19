<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model {
    use HasFactory ,SoftDeletes;

    protected $table = 'articles';
    protected $primaryKey = 'article_id';

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

    public function tags(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'article_tag', 'article_id', 'tag_id');
    }

}
