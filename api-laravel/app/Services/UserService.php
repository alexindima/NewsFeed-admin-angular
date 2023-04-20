<?php

declare(strict_types=1);

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class UserService
{
    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly CategoryService $categoryService,
        private readonly TagService $tagService,
    ){
    }

    public function getById($id): Model
    {
        return $this->userRepository->getById($id);
    }

    public function getTotalCount(): int
    {
        return $this->userRepository->getTotal();
    }

    public function getPaginated($limit = 10, $offset = 0): Collection
    {
        return $this->userRepository->getPaginated($limit, $offset);
    }

    public function create($user): Model
    {
        $newUser = $this->userRepository->create($user);

        $categoryIds = $this->categoryService->createManyByName($user['categories']);
        $tagIds = $this->tagService->createManyByName($user['tags']);

        $this->userRepository->addCategories($newUser->id, $categoryIds);
        $this->userRepository->addTags($newUser->id, $tagIds);

        return $newUser;
    }

    public function update($id, $user): Model
    {
        $categoryIds = $this->categoryService->createManyByName($user['categories']);
        $tagIds = $this->tagService->createManyByName($user['tags']);

        $this->userRepository->addCategories($id, $categoryIds);
        $this->userRepository->addTags($id, $tagIds);

        return $this->userRepository->update($id, $user);
    }

    public function delete($id): bool
    {
        return $this->userRepository->delete($id);
    }
}
