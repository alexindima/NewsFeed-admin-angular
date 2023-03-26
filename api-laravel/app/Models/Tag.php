<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tag extends Model {
    use HasFactory ,SoftDeletes;

    protected $table = 'tags';
    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
    ];

    protected $visible = [
        'id',
        'name',
    ];

    public function articles(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Article::class, 'article_tag', 'tag_id', 'id');
    }

    public function users(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_tag', 'tag_id', 'id');
    }
}

