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

    function create($data): Model
    {
        return $this->model::query()->create($data);
    }

    public function update($id, $data): Model
    {
        $model = $this->model::query()->findOrFail($id);
        $model->update($data);

        return $model;
    }

    public function delete($id): bool
    {
        return $this->model::query()->findOrFail($id)->delete();
    }
}
