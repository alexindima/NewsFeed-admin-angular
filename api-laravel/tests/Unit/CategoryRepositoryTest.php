<?php

namespace Tests\Unit;

use App\DbModels\Category;
use App\Repositories\CategoryRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryRepositoryTest extends TestCase
{
    use RefreshDatabase;


    public function test_create(): void
    {
        $repository = $this->app->make(CategoryRepository::class);

        $payload = [
            'name' => uniqid('category_', true),
        ];

        $result = $repository->create($payload);

        $this->assertSame($payload['name'], $result->name, 'Category created does not have name');
    }

    public function test_update(): void
    {
        $repository = $this->app->make(CategoryRepository::class);
        $dummy = Category::factory(1)->create()->first();

        $payload = [
            'name' => uniqid('category_', true),
        ];

        $result = $repository->update($dummy->id, $payload);

        $this->assertSame($payload['name'], $result->name, 'Category does not have changed name');
    }

    public function test_delete(): void
    {
        $repository = $this->app->make(CategoryRepository::class);
        $dummy = Category::factory(1)->create()->first();

        $repository->delete($dummy->id);

        $found = Category::query()->find($dummy->id);

        $this->assertSame(null, $found, 'Category is not deleted');
    }

}
