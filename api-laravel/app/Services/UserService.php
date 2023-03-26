<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class UserService
{

    protected UserRepository $repository;

    public function __construct(UserRepository $repository)
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

    public function getTotalCount(): int
    {
        return $this->repository->getTotal();
    }

    public function getPaginated($limit = 10, $offset = 0): array
    {
        $users = $this->repository->getPaginated($limit, $offset);
        $total = $this->repository->getTotal();

        return [
            'data' => $users,
            'total' => $total,
        ];
    }

    public function create($user): Model
    {
        return $this->repository->create($user);
    }

    public function update($id, $user): Model
    {
        return $this->repository->update($id, $user);
    }

    public function delete($id): bool
    {
        return $this->repository->delete($id);
    }
}
