<?php

namespace App\Services;

use App\Repositories\CategoryRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class CategoryService
{

    protected CategoryRepository $repository;

    public function __construct(CategoryRepository $repository)
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

    public function create($category): Model
    {
        return $this->repository->create($category);
    }

    public function createByName($categoryName): int
    {
        return $this->repository->createBy('name', $categoryName);
    }

    public function createManyByName($categoryNames): Collection
    {
        return $this->repository->createManyBy('name', $categoryNames);
    }

    public function update($id, $category): Model
    {
        return $this->repository->update($id, $category);
    }

    public function delete($id): bool
    {
        return $this->repository->delete($id);
    }
}
