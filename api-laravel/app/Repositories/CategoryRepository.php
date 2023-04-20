<?php

declare(strict_types=1);

namespace App\Repositories;

use App\DbModels\Category;

class CategoryRepository extends BaseRepository
{
    public function __construct()
    {
        parent::__construct(Category::class);
    }
}
