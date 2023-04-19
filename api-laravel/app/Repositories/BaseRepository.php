<?php

namespace App\Repositories;

use App\Exceptions\GeneralJsonException;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

abstract class BaseRepository
{
    protected Model $model;

    /**
     * @throws Exception
     */
    public function __construct(string $model)
    {
        $instance = new $model;
        if (!($instance instanceof Model)) {
            throw new GeneralJsonException("$model is not a Model class");
        }
        $this->model = $instance;
    }

    public function getById(int $id): Model
    {
        return $this->model::query()->findOrFail($id);
    }

    public function getAll(): Collection
    {
       return $this->model::all();
    }

    // не забывай про public
    public function create($data): Model
    {
        return $this->model::query()->firstOrCreate($data);
    }

    public function createBy($by, $value): int
    {
        return $this->create([$by => $value])->id;

    }

    public function createManyBy($by, $values): Collection
    {
        $ids = new Collection();
        foreach ($values as $value) {
            $ids->add($this->createBy($by, $value));
        }
        return $ids;
    }

    public function update($id, $data): Model
    {
        $model = $this->model::query()->findOrFail($id);
        $model->update($data);

        return $model;
    }

    public function delete($id): bool
    {
        // там где может вернуться null лучше использовать null-safe оператор (?->), чтобы не было лишней проверки на null
        // и чтобы не падал по null pointer exception
        return $this->model::query()->findOrFail($id)->delete();
    }
}
