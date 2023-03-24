<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Services\ArticleService;
use Illuminate\Http\Request;

//class ArticleController extends BaseController {
class ArticleController extends Controller {


    /*public function __construct()
    {
        parent::__construct(Article::class);
    }

    public function show(\Illuminate\Http\Request $request, $id): \Illuminate\Http\JsonResponse{
        dump($this->modelClass);
        $model = $this->modelClass::findOrFail($id);
        return response()->json($model);
    }

    public function index(\Illuminate\Http\Request $request): \Illuminate\Http\JsonResponse
    {
        $limit = $request->query('limit', 10);
        $offset = $request->query('offset', 0);

        $query = $this->modelClass::query();

        $total = $query->count();

        $data = $query
            ->limit($limit)
            ->offset($offset)
            ->get();

//        $data = $query
//            ->paginate(5);

        return response()->json([
            'data' => $data,
            'total' => $total,
        ]);
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
//        $article = [
//            'main_title' => $request->main_title ?? $model->main_title,
//            'second_title' => $request->second_title ?? $model->second_title,
//            'photo_pass' => $request->photo_pass ?? $model->photo_pass,
//            'photo_text' => $request->photo_text ?? $model->photo_text,
//            'body' => $request->body ?? $model->body,
//            'category' => $request->category ?? $model->category,
//        ];
//        $model->update($article);
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

    public function destroy(\Illuminate\Http\Request $request, $id): \Illuminate\Http\JsonResponse
    {
        $model = $this->modelClass::findOrFail($id);
        $model->delete();
        return response()->json(null, 204);
    }*/

    private ArticleService $articleService;

    public function __construct(ArticleService $articleService)
    {
        $this->articleService = $articleService;
    }

    public function show(Request $request, int $id)
    {
        $article = $this->articleService->getById($id);
        return response()->json($article);
    }

    public function index(Request $request)
    {
        $limit = $request->query('limit', 10);
        $offset = $request->query('offset', 0);

        $articles = $this->articleService->getPaginated($limit, $offset);

        return response()->json($articles);
    }

    public function store(Request $request)
    {
        $article = [
            'main_title' => $request->main_title,
            'second_title' => $request->second_title,
            'photo_pass' => $request->photo_pass,
            'photo_text' => $request->photo_text,
            'body' => $request->body,
            'category' => $request->category,
        ];

        $newArticle = $this->articleService->create($article);

        return response()->json($newArticle, 201);
    }

    public function update(Request $request, int $id)
    {
        $article = [
            'main_title' => $request->main_title,
            'second_title' => $request->second_title,
            'photo_pass' => $request->photo_pass,
            'photo_text' => $request->photo_text,
            'body' => $request->body,
            'category' => $request->category,
        ];

        $updatedArticle = $this->articleService->update($id, $article);

        return response()->json($updatedArticle);
    }

    public function destroy(Request $request, int $id)
    {
        $this->articleService->delete($id);

        return response()->json(null, 204);
    }
}
