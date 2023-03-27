<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArticleStoreRequest;
use App\Http\Requests\ArticleUpdateRequest;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use App\Services\ArticleService;
use Illuminate\Http\Request;

class ArticleController extends Controller {
    private ArticleService $articleService;

    public function __construct(ArticleService $articleService)
    {
        $this->articleService = $articleService;
    }

    public function show(Request $request, int $id)
    {
        $article = $this->articleService->getById($id);
        return response()->json(new ArticleResource($article),);
    }

    public function index(Request $request)
    {
        $limit = $request->query('limit', 10);
        $offset = $request->query('offset', 0);

        $articles = $this->articleService->getPaginated($limit, $offset);
        $total = $this->articleService->getTotalCount();

        return response()->json([
            'data' => ArticleResource::collection($articles),
            'total' => $total,
        ]);
    }

    public function store(ArticleStoreRequest $request)
    {
        $article = [
            'main_title' => $request->main_title,
            'second_title' => $request->second_title,
            'photo_pass' => $request->photo_pass,
            'photo_text' => $request->photo_text,
            'body' => $request->body,
            'category' => $request->category,
            'tags' => $request->tags,
        ];

        $newArticle = $this->articleService->create($article);

        return response()->json(new ArticleResource($newArticle), 201);
    }

    public function update(ArticleUpdateRequest $request, int $id)
    {
        $original = $this->articleService->getById($id);
        $article = [
            'main_title' => $request->main_title ?? $original->main_title,
            'second_title' => $request->second_title ?? $original->second_title,
            'photo_pass' => $request->photo_pass ?? $original->photo_pass,
            'photo_text' => $request->photo_text ?? $original->photo_text,
            'body' => $request->body ?? $original->body,
            'category' => $request->category ?? $original->category,
            'tags' => $request->tags,
        ];

        $updatedArticle = $this->articleService->update($id, $article);

        return response()->json(new ArticleResource($updatedArticle), 200);
    }

    public function destroy(Request $request, int $id)
    {
        $this->articleService->delete($id);

        return response()->json(null, 204);
    }
}
