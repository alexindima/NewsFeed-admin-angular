<?php

namespace Tests\Feature\Api;

use App\Events\Models\User\UserCreated;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

class UserApiTest extends TestCase
{
    use RefreshDatabase;
    public function test_index(): void
    {
        $dummy = User::factory(10)->create();
        $dummyIds = $dummy->map(fn ($el) => $el->id);

        $response = $this->get('/api/users');

        $response->assertStatus(200);
        $data = $response->json('data');

        collect($data)->each(fn ($el) => $this->assertTrue(in_array($el['id'], $dummyIds->toArray())));
    }

    public function test_show(): void
    {
        $dummy = User::factory()->create();

        $response = $this->get('/api/users/'.$dummy->id);

        $response->assertStatus(200);
        $this->assertEquals(data_get($response, 'id'), $dummy->id, 'Response ID is not the same as model ID');
    }

    public function test_create(): void
    {
        Event::fake();
        $dummy = User::factory()->make();

        $response = $this->post('/api/users', $dummy->toArray());

        Event::assertDispatched(UserCreated::class);
        $response->assertStatus(201);
        $data = collect($response)->only(array_keys($dummy->getAttributes()));
        $data->each(function ($value, $field) use($dummy){
            $this->assertSame(data_get($dummy, $field), $value, 'Fillable is not the same');
        });
    }

    public function test_update(): void
    {
        $dummy = User::factory()->create();
        $dummyForUpdate = User::factory()->make();

        $fillable = collect((new User())->getFillable());

        $fillable->each(function ($toUpdate) use($dummy, $dummyForUpdate){
            $response = $this->patch('/api/users/'.$dummy->id, [
                $toUpdate => data_get($dummyForUpdate, $toUpdate),
            ]);
            $response->assertStatus(200);

            $this->assertSame(data_get($dummyForUpdate, $toUpdate), data_get($dummy->refresh(), $toUpdate), 'Failed to update model');
        });
    }

    public function test_delete(): void
    {
        $dummy = User::factory()->create();

        $response = $this->delete('/api/users/'.$dummy->id);

        $response->assertStatus(204);

        $this->expectException(ModelNotFoundException::class);
        User::query()->findOrFail($dummy->id);
    }
}
