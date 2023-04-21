<?php

namespace Tests\Unit;

use App\Models\Tag;
use App\Repositories\TagRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TagRepositoryTest extends TestCase
{
    use RefreshDatabase;


    public function test_create(): void
    {
        $repository = $this->app->make(TagRepository::class);

        $payload = [
            'name' => uniqid('tag_', true),
        ];

        $result = $repository->create($payload);

        $this->assertSame($payload['name'], $result->name, 'Tag created does not have name');
    }

    public function test_update(): void
    {
        $repository = $this->app->make(TagRepository::class);
        $dummy = Tag::factory(1)->create()->first();

        $payload = [
            'name' => uniqid('tag_', true),
        ];

        $result = $repository->update($dummy->id, $payload);

        $this->assertSame($payload['name'], $result->name, 'Tag does not have changed name');
    }

    public function test_delete(): void
    {
        $repository = $this->app->make(TagRepository::class);
        $dummy = Tag::factory(1)->create()->first();

        $repository->delete($dummy->id);

        $found = Tag::query()->find($dummy->id);

        $this->assertSame(null, $found, 'Tag is not deleted');
    }
}
