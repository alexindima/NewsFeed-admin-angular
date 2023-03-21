<?php

namespace App\Http\Controllers;

use App\Models\Article;

class ArticleController extends BaseController {

    public function __construct()
    {
        parent::__construct(Article::class);
    }

    public function store(\Illuminate\Http\Request $request): \Illuminate\Http\JsonResponse
    {
        $article = [
            'main_title' => $request->main_title,
            'second_title' => $request->second_title,
            'photo_pass' => $request->photo_pass,
            'photo_text' => $request->photo_text,
            'body' => $request->body,
            'category' => $request->category,
        ];
        $model = $this->modelClass::create($article);
        return response()->json($model, 201);
    }

    public function update(\Illuminate\Http\Request $request, $id): \Illuminate\Http\JsonResponse
    {
        $model = $this->modelClass::findOrFail($id);
        /*$article = [
            'main_title' => $request->main_title ?? $model->main_title,
            'second_title' => $request->second_title ?? $model->second_title,
            'photo_pass' => $request->photo_pass ?? $model->photo_pass,
            'photo_text' => $request->photo_text ?? $model->photo_text,
            'body' => $request->body ?? $model->body,
            'category' => $request->category ?? $model->category,
        ];
        $model->update($article);*/
        $model->update($request->only([
            'main_title',
            'second_title',
            'photo_pass',
            'photo_text',
            'body',
            'category'
        ]));
        return response()->json($model);
    }
}
