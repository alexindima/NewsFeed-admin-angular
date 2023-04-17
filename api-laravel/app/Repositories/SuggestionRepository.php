<?php

namespace App\Repositories;

use App\Models\Suggestion;

// надо удалить
class SuggestionRepository extends BaseRepository
{
    public function __construct()
    {
        parent::__construct(Suggestion::class);
    }
}
