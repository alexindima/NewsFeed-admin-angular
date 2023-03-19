<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Suggestion;

class SuggestionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        Suggestion::factory(10)->create();
    }
}
