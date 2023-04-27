<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition(): array
    {
        // довольно часто используешь эти роли в разных местах, создай для них енамку
        $roles = ['admin', 'user'];
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'password' => Hash::make('secret'),
            //'role' => $roles[array_rand($roles)],
            'role' => 'admin',
        ];
    }
}
