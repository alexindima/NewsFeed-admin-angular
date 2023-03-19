<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tag extends Model {
    use HasFactory ,SoftDeletes;

    protected $table = 'tags';
    protected $primaryKey = 'tag_id';

    protected $fillable = [
        'tag_id',
        'name',
    ];

    protected $visible = [
        'tag_id',
        'name',
    ];

    public function articles(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Article::class, 'article_tag', 'tag_id', 'article_id');
    }

    public function users(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_tag', 'tag_id', 'user_id');
    }
}

