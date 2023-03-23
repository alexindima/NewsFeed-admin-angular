<?php

namespace App\Repositories;

use App\Models\Article;
use App\Models\Tag;

class TagRepository extends BaseRepository
{
    public function __construct()
    {
        parent::__construct(Tag::class);
    }
}
