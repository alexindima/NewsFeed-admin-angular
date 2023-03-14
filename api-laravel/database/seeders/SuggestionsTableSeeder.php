<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Suggestion;
use Illuminate\Support\Facades\Hash;

class SuggestionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $suggestions = [
            [
                'news' => 1,
            ],
            [
                'news' => 2,
            ],
            [
                'news' => 3,
            ],
            [
                'news' => 4,
            ],
            [
                'news' => 5,
            ],
            [
                'news' => 10,
            ],
            [
                'news' => 11,
            ],
        ];

        foreach ($suggestions as $suggestion) {
            Suggestion::create($suggestion);
        }
    }
}
