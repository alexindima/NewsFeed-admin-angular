<?php

namespace App\Repositories;

use App\DbModels\Article;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

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

    public function create($data): Model
    {
        return $this->model::query()->create($data);
    }

    public function addTags($articleId, $tagIds): bool
    {
        $article = $this->model::find($articleId);
        if (!$article) {
            return false;
        }

        $article->tags()->sync([...$tagIds]  , ['detach' => true]);

        return true;
    }


}
