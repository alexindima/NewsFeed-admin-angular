<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Tag;

class TagController extends BaseController {
    public function __construct()
    {
        parent::__construct(Tag::class);
    }

    public function create(\Illuminate\Http\Request $request): \Illuminate\Http\JsonResponse
    {
        $model = Tag::firstOrCreate(['name' => 'current name'], $request->all());
        return response()->json($model, 201);
    }

}
