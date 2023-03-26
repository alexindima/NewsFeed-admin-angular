<?php

namespace App\Services;

use App\Repositories\SuggestionRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class SuggestionService
{

    protected SuggestionRepository $repository;

    public function __construct(SuggestionRepository $repository)
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

    public function create($suggestion): Model
    {
        return $this->repository->create($suggestion);
    }

    public function update($id, $suggestion): Model
    {
        return $this->repository->update($id, $suggestion);
    }

    public function delete($id): bool
    {
        return $this->repository->delete($id);
    }
}
