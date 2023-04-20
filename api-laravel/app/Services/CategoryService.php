<?php

declare(strict_types=1);

namespace App\Services;

use App\Repositories\CategoryRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class CategoryService
{
    public function __construct(
        private readonly CategoryRepository $categoryRepository
    ){
    }

    public function getById($id): Model
    {
        return $this->categoryRepository->getById($id);
    }

    public function getAll(): Collection
    {
        return $this->categoryRepository->getAll();
    }

    public function create($category): Model
    {
        return $this->categoryRepository->create($category);
    }

    public function createByName($categoryName): int
    {
        return $this->categoryRepository->createBy('name', $categoryName);
    }

    /**
     * @return array<int>
     */
    public function createManyByName($categoryNames): array
    {
        return $this->categoryRepository->createManyBy('name', $categoryNames);
    }

    public function update($id, $category): Model
    {
        return $this->categoryRepository->update($id, $category);
    }

    public function delete($id): bool
    {
        return $this->categoryRepository->delete($id);
    }
}
