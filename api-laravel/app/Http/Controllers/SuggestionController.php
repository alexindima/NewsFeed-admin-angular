<?php

namespace App\Http\Controllers;

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
        $articles = $this->suggestionService->getAll();
        $total = $this->suggestionService->getTotal();

        return response()->json([
            'data' => $articles,
            'total' => $total,
        ]);
    }
}
