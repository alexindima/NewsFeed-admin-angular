<?php

// все что здесь написано  справедливо и для остальных контроллеров

// напишу сюда, тебе нужно добавить во все php файлы строгую проверку типов
// это заставит PHP вместо того чтобы неявно приводить аргументы в нужный тип, просто выкидывать TypeError
// и заставит тебя больше следить за типами переменных в целом, явно их приводить к нужному типа итд.
declare(strict_types=1); // добавляй это в самое начала пхп файла

namespace App\Http\Controllers;

use App\Http\Requests\ArticleStoreRequest;
use App\Http\Requests\ArticleUpdateRequest;
use App\Http\Resources\ArticleResource;
use App\Models\OperationResult;
use App\Models\PagingModel;
use App\Services\ArticleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

/**
 * @group Article Management
 *
 * APIs to manage the article resource.
 */
// фигурную скобку с новой строки
class ArticleController extends Controller {

    // как правило сервисы и репы не изменяемые, юзай readonly для них
    // а также здесь и для всех остальных классов можно юзать фичу php 8
    // https://stitcher.io/blog/constructor-promotion-in-php-8
    public function __construct(private readonly ArticleService $articleService)
    {
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
        // добавь типизации, лучше явно кастовать эти значения в int
        $limit = $request->query('limit', 10);
        $offset = $request->query('offset', 0);

        $articles = $this->articleService->getPaginated($limit, $offset);
        $total = $this->articleService->getTotalCount();

        $data = new PagingModel(ArticleResource::collection($articles), $total);
        $result = OperationResult::success($data);

        return response()->json($result);
    }

    /**
     * Display the specific article
     *
     * @urlParam id int required Article ID
     * @apiResource App\Http\Resources\ArticleResource
     * @apiResourceModel App\Models\Article
     */
    public function show(int $id): JsonResponse
    {
        $article = $this->articleService->getById($id);
        $result = OperationResult::success(new ArticleResource($article));

        return response()->json($result);
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

        // создавай для такого отдельную модель по типу CreateArticleModel
        // а сам маппинг делай либо в отдельном маппере, либо еще лучше сразу в ArticleStoreRequest
        $article = [
            'main_title' => $request->mainTitle,
            'second_title' => $request->secondTitle,
            'photo_pass' => $request->photoPass,
            'photo_text' => $request->photoText,
            'body' => $request->body,
            'category' => $request->category,
            'tags' => $request->tags,
            'likes' => 0,
            'dislikes' => 0,
        ];

        $newArticle = $this->articleService->create($article);
        $result = OperationResult::success(new ArticleResource($newArticle), "Article '{$request->mainTitle}' created");

        return response()->json($result, 201);
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

        // вижу, что подчеркивается $original->main_title, тебе бы создать файлик _ide_helper_models.php для моделей БД
        // тогда идешка будет подсказывать нужные тебе поля
        // нужный пакет у тебя уже установлен, там просто нужно выполнить артизан команду
        // https://github.com/barryvdh/laravel-ide-helper
        // php artisan ide-helper:models
        $article = [
            'main_title' => $request->mainTitle ?? $original->main_title,
            'second_title' => $request->secondTitle ?? $original->second_title,
            'photo_pass' => $request->photoPass ?? $original->photo_pass,
            'photo_text' => $request->photoText ?? $original->photo_text,
            'body' => $request->body ?? $original->body,
            'category' => $request->category ?? $original->category->name,
            'tags' => $request->tags,
            'likes' => 0,
            'dislikes' => 0,
        ];

        // тут тоже стоит создать свой тип и смаппить его с реквеста, для большей типизации
        $originalName = $this->articleService->getById($id)->main_title;
        $updatedArticle = $this->articleService->update($id, $article);
        $result = OperationResult::success(new ArticleResource($updatedArticle), "Article '{$originalName}' changed");

        return response()->json($result);
    }

    /**
     * Remove the specific article
     *
     * @urlParam id int required Article ID
     * @apiResource App\Http\Resources\ArticleResource
     * @apiResourceModel App\Models\Article
     */
    public function destroy(int $id): JsonResponse
    {
        $name = $this->articleService->getById($id)->main_title;
        $this->articleService->delete($id);
        $result = OperationResult::success(null, "Article '{$name}' deleted");

        return response()->json($result);
    }
}
