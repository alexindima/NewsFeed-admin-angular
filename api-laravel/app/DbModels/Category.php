<?php

namespace App\DbModels;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model {
    use HasFactory ,SoftDeletes;

    protected $table = 'categories';
    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
    ];

    protected $visible = [
        'id',
        'name',
    ];

    public function users(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_category', 'category_id', 'user_id');
    }
}
