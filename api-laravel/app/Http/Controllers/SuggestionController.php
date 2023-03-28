<?php

namespace App\Http\Controllers;

use App\Http\Requests\SuggestionStoreRequest;
use App\Http\Requests\SuggestionUpdateRequest;
use App\Http\Resources\SuggestionResource;
use App\Models\Suggestion;
use App\Services\ArticleService;
use App\Services\SuggestionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * @group Suggestion Management
 *
 * APIs to manage the suggestion resource.
 */
class SuggestionController extends Controller {
    private SuggestionService $suggestionService;

    public function __construct(SuggestionService $suggestionService)
    {
        $this->suggestionService = $suggestionService;
    }

    /**
     * Display a listing of suggestion news
     *
     * Gets list of suggestion news
     *
     * @apiResourceCollection App\Http\Resources\SuggestionResource
     * @apiResourceModel App\Models\Suggestion
     */
    public function index(Request $request): JsonResponse
    {
        $news = $this->suggestionService->getAll();

        return response()->json(SuggestionResource::collection($news));
    }

    /**
     * Display  the specific suggestion news
     *
     * @urlParam id int required Suggestion new ID
     * @apiResource App\Http\Resources\SuggestionResource
     * @apiResourceModel App\Models\Suggestion
     */
    public function show(Request $request, int $id): JsonResponse
    {
        $news = $this->suggestionService->getById($id);

        return response()->json(new SuggestionResource($news));
    }

    /**
     * Store a newly created resource in storage
     *
     * @bodyParam news int required ID of suggested news. Example: 2
     * @apiResource App\Http\Resources\SuggestionResource
     * @apiResourceModel App\Models\Suggestion
     */
    public function store(SuggestionStoreRequest $request): JsonResponse
    {
        $news = [
            'news' => $request->news,
        ];

        $newNews = $this->suggestionService->create($news);

        return response()->json(new SuggestionResource($newNews), 201);
    }

    /**
     * Update a resource in storage
     *
     * @urlParam id int required Suggestion new ID
     * @bodyParam news int required ID of suggested news. Example: 2
     * @apiResource App\Http\Resources\SuggestionResource
     * @apiResourceModel App\Models\Suggestion
     */
    public function update(SuggestionUpdateRequest $request, int $id): JsonResponse
    {
        $news = [
            'news' => $request->news,
        ];

        $updatedNews = $this->suggestionService->update($id, $news);

        return response()->json(new SuggestionResource($updatedNews), 200);
    }

    /**
     * Remove the specific suggestion news
     *
     * @urlParam id int required Suggestion news ID
     * @response 204 {
        "data": "true"
     * }
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        $this->suggestionService->delete($id);

        return response()->json(["data"=> "true"], 204);
    }
}
