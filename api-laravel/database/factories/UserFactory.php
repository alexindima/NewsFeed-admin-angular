<?php

namespace Database\Factories;

use App\DbModels\User;
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
            'email' => uniqid('email_').$this->faker->unique()->safeEmail,
            'password' => Hash::make('password'),
            'role' => $roles[array_rand($roles)],
        ];
    }
}
