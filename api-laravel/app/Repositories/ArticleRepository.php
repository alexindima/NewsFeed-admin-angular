<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Article;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class ArticleRepository extends BaseRepository
{
    private const TOTAL_SUGGESTED = 5;
    public function __construct()
    {
        parent::__construct(Article::class);
    }

    public function getTotal(): int
    {
        return $this->model::query()->count();
    }

    public function getPaginated(int $pageSize = 10, int $page = 1): Collection
    {
        $query = $this->model::query();

        return $query
            ->limit($pageSize)
            ->offset(($page - 1) * $pageSize)
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

        $article->tags()->sync($tagIds  , ['detach' => true]);

        return true;
    }

    public function getSuggested(): array
    {
        // вместо связки select('id'), get(), можно использовать в конце pluck('id')->toArray()
        // также нет смысла делать json_decode и маппинг, т.к. тебе уже возвращается массив айдишников
        $rows = Article::select('id')
            ->selectRaw('(likes - dislikes) AS difference')
            ->orderByRaw('(likes - dislikes) DESC')
            ->limit(self::TOTAL_SUGGESTED)
            ->get();

        $array = json_decode($rows, true);

        return array_map(function($item) {
            return $item['id'];
        }, $array);

    }

    public function geSuggestedTotal(): int
    {
        return self::TOTAL_SUGGESTED;
    }
}
