<?php

namespace App\Services;

use App\Repositories\TagRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class TagService
{

    protected TagRepository $repository;

    public function __construct(TagRepository $repository)
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

    public function create($tag): Model
    {
        return $this->repository->create($tag);
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
