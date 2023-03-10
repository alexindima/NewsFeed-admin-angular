<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model {
    protected $table = 'tags';

    protected $fillable = [
        'tag_id',
        'name',
    ];

    protected $visible = [
        'tag_id',
        'name',
    ];
}
