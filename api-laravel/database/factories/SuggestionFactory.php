<?php

namespace Database\Factories;

use App\Models\Suggestion;
use Illuminate\Database\Eloquent\Factories\Factory;

class SuggestionFactory extends Factory
{
    protected $model = Suggestion::class;

    public function definition(): array
    {
        return [
            'news' => mt_rand(1,99999),
        ];
    }
}
