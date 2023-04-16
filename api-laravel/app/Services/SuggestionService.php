<?php

namespace App\Services;

use App\Models\Article;
use App\Repositories\SuggestionRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class SuggestionService
{
    private const total = 5;

    public function getAll(): array
    {
        $rows = Article::select('id')
            ->selectRaw('(likes - dislikes) AS difference')
            ->orderByRaw('(likes - dislikes) DESC')
            ->limit(self::total)
            ->get();

        $array = json_decode($rows, true);

        return array_map(function($item) {
            return $item['id'];
        }, $array);

    }

    public function getTotal(): int
    {
        return self::total;
    }
}
