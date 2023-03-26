<?php

namespace App\Services;

use App\Repositories\ArticleRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class ArticleService
{

    protected ArticleRepository $repository;

    public function __construct(ArticleRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getById($id): Model
    {
        return $this->repository->getById($id);
    }

    public function getAll(): Collection
    {
        return $this->repository->getAll();
    }

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
