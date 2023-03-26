<?php

namespace Tests\Unit;

use App\Models\Suggestion;
use App\Repositories\SuggestionRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SuggestionRepositoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_create(): void
    {
        $repository = $this->app->make(SuggestionRepository::class);

        $payload = [
            'news' => mt_rand(1,99999),
        ];

        $result = $repository->create($payload);

        $this->assertSame($payload['news'], $result->news, 'Suggestion created does not have news');
    }

    public function test_update(): void
    {
        $repository = $this->app->make(SuggestionRepository::class);
        $dummy = Suggestion::factory(1)->create()->first();

        $payload = [
            'news' => mt_rand(99999, 199999),
        ];

        $result = $repository->update($dummy->id, $payload);

        $this->assertSame($payload['news'], $result->news, 'Suggestion does not have changed news');
    }

    public function test_delete(): void
    {
        $repository = $this->app->make(SuggestionRepository::class);
        $dummy = Suggestion::factory(1)->create()->first();

        $repository->delete($dummy->id);

        $found = Suggestion::query()->find($dummy->id);

        $this->assertSame(null, $found, 'Suggestion is not deleted');
    }
}
