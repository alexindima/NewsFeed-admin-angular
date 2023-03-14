<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tag extends Model {
    use SoftDeletes;

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
}
