<?php

namespace App\Repositories;

use App\Models\Article;
use Illuminate\Database\Eloquent\Collection;

class ArticleRepository extends BaseRepository
{
    public function __construct()
    {
        parent::__construct(Article::class);
    }

    public function getTotal(): int
    {
        return $this->model::query()->count();
    }

    public function getPaginated(int $limit = 10, int $offset = 0): Collection
    {
        $query = $this->model::query();

        return $query
            ->limit($limit)
            ->offset($offset)
            ->get();
    }


}
