<?php

namespace App\Services;

use App\Models\Article;

class SuggestionService
{
    // константы должны быть оформлены в UPPER_CASE
    private const total = 5;

    /**
     * @return array<int> // для массивов стоит добавлять php доки, которые указывают тип массива, тогда IDE будет подсзказывать тип
     */
    public function getAll(): array
    {
        // нужно вынести в репозиторий статей, абсолютно вся логика работы с данными не должны выходить за пределы репозиторий
        // вместо связки select('id'), get(), можно использовать в конце pluck('id')->toArray()
        // также нет смысла делать json_decode и маппинг, т.к. тебе уже возвращается массив айдишников
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
