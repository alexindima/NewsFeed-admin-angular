<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Article;
use App\Repositories\ArticleRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\TagRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class ArticleService
{
    public function __construct(
        private readonly ArticleRepository $articleRepository,
        private readonly CategoryService $categoryService,
        private readonly TagService $tagService,
    ){
    }

    // смотрю во всех сервисах возвращается Model, так быть не должно
    // для типизации нужен конкретный тип, к тому же Model позволяет по сути обращаться к БД, менять или удалять модель
    // а это можно делать только в репозиториях, да и в целом использовать одну и ту же модель
    // на разных уровнях приложения не стоит, возникает сильная связанность между уровнями, а мы какраз хотим от нее избавиться
    // например тут возвращать ArticleModel с нужными тебе полями и маппить их с Model в репозитории
    // в целом почитай про DTO модели
    public function getById($id): Model
    {
        return $this->articleRepository->getById($id);
    }

    // надо добавить везде типизацию
    // а возвращать лучше именно свой тип со нужными тебе полям, типа Collection<ArticleModel>
    public function getPaginated($pageSize = 10, $page = 1): Collection
    {
        return $this->articleRepository->getPaginated($pageSize, $page);
    }

    public function getTotalCount(): int
    {
        return $this->articleRepository->getTotal();
    }

    public function create($article): Model
    {
        $categoryId = $this->categoryService->createByName($article['category']);
        $article['category_id'] = $categoryId;
        $newArticle = $this->articleRepository->create($article);

        $tagIds = $this->tagService->createManyByName($article['tags']);

        $this->articleRepository->addTags($newArticle->id, $tagIds);

        return $newArticle;
    }

    public function update($id, $article): Model
    {
        $categoryId = $this->categoryService->createByName($article['category']);
        $tagIds = $this->tagService->createManyByName($article['tags']);

        $article['category_id'] = $categoryId;
        $this->articleRepository->addTags($id, $tagIds);

        return $this->articleRepository->update($id, $article);
    }

    public function delete($id): bool
    {
        return $this->articleRepository->delete($id);
    }
}
