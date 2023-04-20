<?php

declare(strict_types=1);

namespace App\Services;

use App\Repositories\TagRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class TagService
{
    public function __construct(
        private readonly TagRepository $repository
    ){
    }

    public function getById($id): Model
    {
        return $this->repository->getById($id);
    }

    public function getAll(): Collection
    {
        return $this->repository->getAll();
    }

    public function create($tag): Model
    {
        return $this->repository->create($tag);
    }

    public function createByName($tagName): int
    {
        return $this->repository->createBy('name', $tagName);
    }

    /**
     * @return array<int>
     */
    public function createManyByName($tagNames): array
    {
        return $this->repository->createManyBy('name', $tagNames);
    }

    public function update($id, $tag): Model
    {
        return $this->repository->update($id, $tag);
    }

    public function delete($id): bool
    {
        return $this->repository->delete($id);
    }
}
