<?php

namespace Tests\Unit;

use App\Models\Suggestion;
use App\Repositories\SuggestionRepository;
use Tests\TestCase;

class SuggestionRepositoryTest extends TestCase
{
    private int|null $createdSuggestionId = null;

    public function test_create(): void
    {
        $repository = $this->app->make(SuggestionRepository::class);

        $payload = [
            'news' => mt_rand(1,99999),
        ];

        $result = $repository->create($payload);
        $this->createdSuggestionId = $result->article_id;

        $this->assertSame($payload['news'], $result->news, 'Suggestion created does not have news');
    }

    public function test_update(): void
    {
        $repository = $this->app->make(SuggestionRepository::class);
        $dummy = Suggestion::factory(1)->create()->first();

        $payload = [
            'news' => mt_rand(99999, 199999),
        ];

        $result = $repository->update($dummy->article_id, $payload);
        $this->createdSuggestionId = $result->article_id;

        $this->assertSame($payload['news'], $result->news, 'Suggestion does not have changed news');
    }

    public function test_delete(): void
    {
        $repository = $this->app->make(SuggestionRepository::class);
        $dummy = Suggestion::factory(1)->create()->first();

        $repository->delete($dummy->article_id);

        $found = Suggestion::query()->find($dummy->article_id);

        $this->assertSame(null, $found, 'Suggestion is not deleted');
    }

    protected function tearDown(): void
    {
        if ($this->createdSuggestionId) {
            Suggestion::query()->where('article_id', $this->createdSuggestionId)->delete();
            $this->createdSuggestionId = null;
        }
        parent::tearDown();
    }
}
