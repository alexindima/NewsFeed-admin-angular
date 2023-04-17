<?php

namespace Tests\Feature\Api;

use App\DbModels\Tag;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TagApiTest extends TestCase
{
    use RefreshDatabase;
    public function test_index(): void
    {
        $dummy = Tag::factory(10)->create();
        $dummyIds = $dummy->map(fn ($el) => $el->id);

        $response = $this->get('/api/tags');

        $response->assertStatus(200);
        $data = $response->json();

        collect($data)->each(fn ($el) => $this->assertTrue(in_array($el['id'], $dummyIds->toArray())));
    }

    public function test_show(): void
    {
        $dummy = Tag::factory()->create();

        $response = $this->get('/api/tags/'.$dummy->id);

        $response->assertStatus(200);
        $this->assertEquals(data_get($response, 'id'), $dummy->id, 'Response ID is not the same as model ID');
    }

    public function test_create(): void
    {
        $dummy = Tag::factory()->make();

        $response = $this->post('/api/tags', $dummy->toArray());

        $response->assertStatus(201);
        $data = collect($response)->only(array_keys($dummy->getAttributes()));
        $data->each(function ($value, $field) use($dummy){
            $this->assertSame(data_get($dummy, $field), $value, 'Fillable is not the same');
        });
    }

    public function test_update(): void
    {
        $dummy = Tag::factory()->create();
        $dummyForUpdate = Tag::factory()->make();

        $fillable = collect((new Tag())->getFillable());

        $fillable->each(function ($toUpdate) use($dummy, $dummyForUpdate){
            $response = $this->patch('/api/tags/'.$dummy->id, [
                $toUpdate => data_get($dummyForUpdate, $toUpdate),
            ]);
            $response->assertStatus(200);

            $this->assertSame(data_get($dummyForUpdate, $toUpdate), data_get($dummy->refresh(), $toUpdate), 'Faqled to update model');
        });
    }

    public function test_delete(): void
    {
        $dummy = Tag::factory()->create();

        $response = $this->delete('/api/tags/'.$dummy->id);

        $response->assertStatus(204);

        $this->expectException(ModelNotFoundException::class);
        Tag::query()->findOrFail($dummy->id);
    }
}
