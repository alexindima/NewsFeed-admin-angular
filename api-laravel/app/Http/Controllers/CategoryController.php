<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends BaseController {
    public function __construct()
    {
        parent::__construct(Category::class);
    }

    public function create(Request $request): \Illuminate\Http\JsonResponse
    {
        $model = Category::firstOrCreate(['name' => 'current name'], $request->all());
        return response()->json($model, 201);
    }

}
