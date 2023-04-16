<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserCategorySeeder extends Seeder
{
    public function run()
    {
        $users = User::all();
        $categories = Category::all();

        foreach ($users as $user) {
            $category_ids = $categories->random(rand(1, 5))->pluck('id');
            foreach ($category_ids as $category_id) {
                $user->categories()->attach($category_id);
            }
        }
    }
}
