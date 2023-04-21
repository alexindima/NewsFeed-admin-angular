<?php

declare(strict_types=1);

namespace App\Repositories;

// следи за неиспользуемыми юзингами и удаляй их
use App\Models\Article;
use App\Models\Tag;

class TagRepository extends BaseRepository
{
    public function __construct()
    {
        parent::__construct(Tag::class);
    }
}
