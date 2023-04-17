<?php

namespace App\Services;

use App\Repositories\ArticleRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class ArticleService
{
    // надо бы переименовать в $articleRepository т.к. сервис может принимать и другие репозитории при необходимости
    // и непонятно почему он protected, по идее должен быть private readonly
    protected ArticleRepository $repository;

    public function __construct(ArticleRepository $repository)
    {
        $this->repository = $repository;
    }

    // смотрю во всех сервисах возвращается Model, так быть не должно
    // для типизации нужен конкретный тип, к тому же Model позволяет по сути обращаться к БД, менять или удалять модель
    // а это можно делать только в репозиториях, да и в целом использовать одну и ту же модель
    // на разных уровнях приложения не стоит, возникает сильная связанность между уровнями, а мы какраз хотим от нее избавиться
    // например тут возвращать ArticleModel с нужными тебе полями и маппить их с Model в репозитории
    // в целом почитай про DTO модели
    public function getById($id): Model
    {
        return $this->repository->getById($id);
    }

    // надо добавить везде типизацию
    // а возвращать лучше именно свой тип со нужными тебе полям, типа Collection<ArticleModel>
    public function getPaginated($limit = 10, $offset = 0): Collection
    {
        return $this->repository->getPaginated($limit, $offset);
    }

    public function getTotalCount(): int
    {
        return $this->repository->getTotal();
    }

    public function create($article): Model
    {
        return $this->repository->create($article);
    }

    public function update($id, $article): Model
    {
        return $this->repository->update($id, $article);
    }

    public function delete($id): bool
    {
        return $this->repository->delete($id);
    }
}
