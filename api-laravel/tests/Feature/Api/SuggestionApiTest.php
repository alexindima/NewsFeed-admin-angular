<?php

namespace Tests\Feature\Api;

use App\DbModels\Suggestion;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SuggestionApiTest extends TestCase
{
    use RefreshDatabase;
    public function test_index(): void
    {
        $dummy = Suggestion::factory(10)->create();
        $dummyIds = $dummy->map(fn ($el) => $el->id);

        $response = $this->get('/api/suggested');

        $response->assertStatus(200);
        $data = $response->json();

        collect($data)->each(fn ($el) => $this->assertTrue(in_array($el['id'], $dummyIds->toArray())));
    }

    public function test_show(): void
    {
        $dummy = Suggestion::factory()->create();

        $response = $this->get('/api/suggested/'.$dummy->id);

        $response->assertStatus(200);
        $this->assertEquals(data_get($response, 'id'), $dummy->id, 'Response ID is not the same as model ID');
    }

    public function test_create(): void
    {
        $dummy = Suggestion::factory()->make();

        $response = $this->post('/api/suggested', $dummy->toArray());

        $response->assertStatus(201);
        $data = collect($response)->only(array_keys($dummy->getAttributes()));
        $data->each(function ($value, $field) use($dummy){
            $this->assertSame(data_get($dummy, $field), $value, 'Fillable is not the same');
        });
    }

    public function test_update(): void
    {
        $dummy = Suggestion::factory()->create();
        $dummyForUpdate = Suggestion::factory()->make();

        $fillable = collect((new Suggestion())->getFillable());

        $fillable->each(function ($toUpdate) use($dummy, $dummyForUpdate){
            $response = $this->patch('/api/suggested/'.$dummy->id, [
                $toUpdate => data_get($dummyForUpdate, $toUpdate),
            ]);
            $response->assertStatus(200);

            $this->assertSame(data_get($dummyForUpdate, $toUpdate), data_get($dummy->refresh(), $toUpdate), 'Faqled to update model');
        });
    }

    public function test_delete(): void
    {
        $dummy = Suggestion::factory()->create();

        $response = $this->delete('/api/suggested/'.$dummy->id);

        $response->assertStatus(204);

        $this->expectException(ModelNotFoundException::class);
        Suggestion::query()->findOrFail($dummy->id);
    }
}
