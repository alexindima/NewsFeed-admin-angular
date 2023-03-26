<?php

namespace Tests\Unit;

use App\Models\Article;
use App\Repositories\ArticleRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleRepositoryTest extends TestCase
{
    use RefreshDatabase;
    public function test_create(): void
    {
        $repository = $this->app->make(ArticleRepository::class);

        $payload = [
            'main_title' => 'test_main_title',
            'second_title' => 'test_second_title',
            'photo_pass' => 'test_photo_pass',
            'photo_text' => 'test_photo_text',
            'body' => 'test_body',
            'category' => 1,
        ];

        $result = $repository->create($payload);

        $this->assertSame($payload['main_title'], $result->main_title, 'Article does not have main_title');
        $this->assertSame($payload['second_title'], $result->second_title, 'Article does not have second_title');
        $this->assertSame($payload['photo_pass'], $result->photo_pass, 'Article does not have photo_pass');
        $this->assertSame($payload['photo_text'], $result->photo_text, 'Article does not have photo_text');
        $this->assertSame($payload['body'], $result->body, 'Article does not have body');
        $this->assertSame($payload['category'], $result->category, 'Article does not have category');
    }

    public function test_update(): void
    {
        $repository = $this->app->make(ArticleRepository::class);
        $dummy = Article::factory(1)->create()->first();

        $payload = [
            'main_title' => 'test_main_title',
            'second_title' => 'test_second_title',
            'photo_pass' => 'test_photo_pass',
            'photo_text' => 'test_photo_text',
            'body' => 'test_body',
            'category' => 1,
        ];

        $result = $repository->update($dummy->id, $payload);

        $this->assertSame($payload['main_title'], $result->main_title, 'Article created does not have changed main_title');
        $this->assertSame($payload['second_title'], $result->second_title, 'Article created does not have changed second_title');
        $this->assertSame($payload['photo_pass'], $result->photo_pass, 'Article created does not have changed photo_pass');
        $this->assertSame($payload['photo_text'], $result->photo_text, 'Article created does not have changed photo_text');
        $this->assertSame($payload['body'], $result->body, 'Article created does not have changed body');
        $this->assertSame($payload['category'], $result->category, 'Article created does not have changed category');
    }

    public function test_delete(): void
    {
        $repository = $this->app->make(ArticleRepository::class);
        $dummy = Article::factory(1)->create()->first();

        $repository->delete($dummy->id);

        $found = Article::query()->find($dummy->id);

        $this->assertSame(null, $found, 'Article is not deleted');
    }
}
