<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Events\Models\User\UserCreated;
use App\DbModels\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class UserRepository extends BaseRepository
{
    public function __construct()
    {
        parent::__construct(User::class);
    }

    public function getTotal(): int
    {
        return $this->model::query()->count();
    }

    public function getPaginated(int $limit = 10, int $offset = 0): Collection
    {
        $query = $this->model::query();

        return $query
            ->limit($limit)
            ->offset($offset)
            ->get();
    }

    function create($data): Model
    {
        $createdUser = $this->model::query()->create($data);
        event(new UserCreated($createdUser));
        return $createdUser;
    }

    public function addTags($articleId, $tagIds): bool
    {
        $article = $this->model::find($articleId);
        if (!$article) {
            return false;
        }

        $article->tags()->sync($tagIds  , ['detach' => true]);

        return true;
    }

    public function addCategories($userId, $categoryIds): bool
    {
        $user = $this->model::find($userId);
        if (!$user) {
            return false;
        }

        $user->categories()->sync($categoryIds  , ['detach' => true]);

        return true;
    }
}
