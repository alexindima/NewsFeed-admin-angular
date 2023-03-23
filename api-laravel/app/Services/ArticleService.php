<?php

namespace App\Services;

use App\Repositories\ArticleRepository;
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

    public function getAll(): array
    {
        $articles = $this->repository->getAll();
        $total = $this->repository->getTotal();

        return [
            'data' => $articles,
            'total' => $total,
        ];
    }

    public function getPaginated($limit = 10, $offset = 0): array
    {
        $articles = $this->repository->getPaginated($limit, $offset);
        $total = $this->repository->getTotal();

        return [
            'data' => $articles,
            'total' => $total,
        ];
    }

    public function create($article): Model
    {
        $createdArticle = $this->repository->create($article);
        if(!$createdArticle) {

        }
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
