<?php

namespace Database\Seeders;

use App\DbModels\Tag;
use App\DbModels\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserTagSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();
        $tags = Tag::all();

        foreach ($users as $user) {
            $tag_ids = $tags->random(rand(1, 5))->pluck('id');
            foreach ($tag_ids as $tag_id) {
                $user->tags()->attach($tag_id);
            }
        }
    }
}
