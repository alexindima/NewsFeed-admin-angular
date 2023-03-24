<?php

namespace Tests\Unit;

use App\Models\User;
use App\Repositories\UserRepository;
use Tests\TestCase;

class UserRepositoryTest extends TestCase
{
    private int|null $createdUserId = null;

    public function test_create(): void
    {
        $repository = $this->app->make(UserRepository::class);

        $payload = [
            'name' => 'test_name',
            'email' => uniqid(uniqid(), true).'@test.te',
            'password' => 'test_password',
        ];

        $result = $repository->create($payload);
        $this->createdUserId = $result->user_id;

        $this->assertSame($payload['name'], $result->name, 'User created does not have name');
        $this->assertSame($payload['email'], $result->email, 'User created does not have email');
        $this->assertSame($payload['password'], $result->password, 'User created does not have category');
    }

    public function test_update(): void
    {
        $repository = $this->app->make(UserRepository::class);
        $dummy = User::factory(1)->create()->first();

        $payload = [
            'name' => 'test_name',
            'email' => uniqid(uniqid(), true).'@test.te',
            'password' => 'test_password',
        ];

        $result = $repository->update($dummy->user_id, $payload);
        $this->createdUserId = $result->user_id;

        $this->assertSame($payload['name'], $result->name, 'User does not have changed name');
        $this->assertSame($payload['email'], $result->email, 'User does not have changed email');
        $this->assertSame($payload['password'], $result->password, 'User does not have changed password');
    }

    public function test_delete(): void
    {
        $repository = $this->app->make(UserRepository::class);
        $dummy = User::factory(1)->create()->first();

        $repository->delete($dummy->user_id);

        $found = User::query()->find($dummy->user_id);

        $this->assertSame(null, $found, 'User is not deleted');
    }

    protected function tearDown(): void
    {
        if ($this->createdUserId) {
            User::query()->where('user_id', $this->createdUserId)->delete();
            $this->createdUserId = null;
        }
        parent::tearDown();
    }
}
