<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArticleStoreRequest;
use App\Http\Requests\ArticleUpdateRequest;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use App\Services\ArticleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * @group Article Management
 *
 * APIs to manage the article resource.
 */
class ArticleController extends Controller {
    private ArticleService $articleService;

    public function __construct(ArticleService $articleService)
    {
        $this->articleService = $articleService;
    }

    /**
     * Display a listing of articles
     *
     * Gets list of articles
     *
     * @queryParam limit int Size per page. Default to 10. Example: 5
     * @queryParam offset int Page to view. Example: 1
     *
     * @apiResource App\Http\Resources\ArticleResource
     * @apiResourceModel App\Models\Article
     */
    public function index(Request $request): JsonResponse
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

    /**
     * Display the specific article
     *
     * @urlParam id int required Article ID
     * @apiResource App\Http\Resources\ArticleResource
     * @apiResourceModel App\Models\Article
     */
    public function show(Request $request, int $id): JsonResponse
    {
        $article = $this->articleService->getById($id);
        return response()->json(new ArticleResource($article),);
    }

    /**
     * Store a newly created resource in storage
     *
     * @bodyParam main_title string required Main title of the article. Example: Most important news
     * @bodyParam second_title string required Second title of the article. Example: Additional information
     * @bodyParam photo_pass string required URL of the main photo of the article. Example: https://www.test.te/img.jpg
     * @bodyParam photo_text string required Description of the main photo of the article. Example: Photo
     * @bodyParam body string required Body of the article. Example: Very long text
     * @bodyParam category string required Category of the article. Example: Ecology
     * @bodyParam tags array Tags of the article.
     * @apiResource App\Http\Resources\ArticleResource
     * @apiResourceModel App\Models\Article
     */
    public function store(ArticleStoreRequest $request): JsonResponse
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

    /**
     * Update a resource in storage
     *
     * @urlParam id int required Article ID
     * @bodyParam main_title string Main title of the article. Example: Most important news
     * @bodyParam second_title string Second title of the article. Example: Additional information
     * @bodyParam photo_pass string URL of the main photo of the article. Example: https://www.test.te/img.jpg
     * @bodyParam photo_text string Description of the main photo of the article. Example: Photo
     * @bodyParam body string Body of the article. Example: Very long text
     * @bodyParam category string Category of the article. Example: Ecology
     * @bodyParam tags array Tags of the article.
     * @apiResource App\Http\Resources\ArticleResource
     * @apiResourceModel App\Models\Article
     */
    public function update(ArticleUpdateRequest $request, int $id): JsonResponse
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

    /**
     * Remove the specific article
     *
     * @urlParam id int required Article ID
     * @response 204 {
        "data": "true"
     * }
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        $this->articleService->delete($id);

        return response()->json(["data"=> "true"], 204);
    }
}
