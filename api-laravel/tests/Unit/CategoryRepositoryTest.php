<?php

namespace Tests\Unit;

use App\Models\Category;
use App\Repositories\CategoryRepository;
use Tests\TestCase;

class CategoryRepositoryTest extends TestCase
{
    private int|null $createdCategoryId = null;

    public function test_create(): void
    {
        $repository = $this->app->make(CategoryRepository::class);

        $payload = [
            'name' => uniqid('category_', true),
        ];

        $result = $repository->create($payload);
        $this->createdCategoryId = $result->category_id;

        $this->assertSame($payload['name'], $result->name, 'Category created does not have name');
    }

    public function test_update(): void
    {
        $repository = $this->app->make(CategoryRepository::class);
        $dummy = Category::factory(1)->create()->first();

        $payload = [
            'name' => uniqid('category_', true),
        ];

        $result = $repository->update($dummy->category_id, $payload);
        $this->createdCategoryId = $result->category_id;

        $this->assertSame($payload['name'], $result->name, 'Category does not have changed name');
    }

    public function test_delete(): void
    {
        $repository = $this->app->make(CategoryRepository::class);
        $dummy = Category::factory(1)->create()->first();

        $repository->delete($dummy->category_id);

        $found = Category::query()->find($dummy->category_id);

        $this->assertSame(null, $found, 'Category is not deleted');
    }

    protected function tearDown(): void
    {
        if ($this->createdCategoryId) {
            Category::query()->where('category_id', $this->createdCategoryId)->delete();
            $this->createdCategoryId = null;
        }
        parent::tearDown();
    }
}
