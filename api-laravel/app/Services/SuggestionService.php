<?php

declare(strict_types=1);

namespace App\Services;

use App\DbModels\Article;
use App\Repositories\ArticleRepository;

class SuggestionService
{
    public function __construct(
        private readonly ArticleRepository $articleRepository
    ){
    }

    /**
     * @return array<int>
     */
    public function getAll(): array
    {
        return $this->articleRepository->getSuggested();
    }

    public function getTotal(): int
    {
        return $this->articleRepository->geSuggestedTotal();
    }
}
