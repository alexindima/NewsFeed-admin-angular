<?php

namespace Tests\Unit;

use App\Models\Tag;
use App\Repositories\TagRepository;
use Tests\TestCase;

class TagRepositoryTest extends TestCase
{
    private int|null $createdTagId = null;

    public function test_create(): void
    {
        $repository = $this->app->make(TagRepository::class);

        $payload = [
            'name' => uniqid('tag_', true),
        ];

        $result = $repository->create($payload);
        $this->createdTagId = $result->tag_id;

        $this->assertSame($payload['name'], $result->name, 'Tag created does not have name');
    }

    public function test_update(): void
    {
        $repository = $this->app->make(TagRepository::class);
        $dummy = Tag::factory(1)->create()->first();

        $payload = [
            'name' => uniqid('tag_', true),
        ];

        $result = $repository->update($dummy->tag_id, $payload);
        $this->createdTagId = $result->tag_id;

        $this->assertSame($payload['name'], $result->name, 'Tag does not have changed name');
    }

    public function test_delete(): void
    {
        $repository = $this->app->make(TagRepository::class);
        $dummy = Tag::factory(1)->create()->first();

        $repository->delete($dummy->tag_id);

        $found = Tag::query()->find($dummy->tag_id);

        $this->assertSame(null, $found, 'Tag is not deleted');
    }

    protected function tearDown(): void
    {
        if ($this->createdTagId) {
            Tag::query()->where('tag_id', $this->createdTagId)->delete();
            $this->createdTagId = null;
        }
        parent::tearDown();
    }
}
