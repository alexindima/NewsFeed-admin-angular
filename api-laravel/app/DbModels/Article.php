<?php

namespace App\DbModels;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model {
    use HasFactory ,SoftDeletes;

    protected $table = 'articles';
    protected $primaryKey = 'id';

    protected $fillable = [
        'main_title',
        'second_title',
        'photo_pass',
        'photo_text',
        'body',
        'category_id',
        'likes',
        'dislikes',
    ];

    protected $visible = [
        'id',
        'main_title',
        'second_title',
        'photo_pass',
        'photo_text',
        'body',
        'category_id',
        'likes',
        'dislikes',
    ];

    public function category(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function tags(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'article_tag', 'article_id', 'tag_id');
    }

}
