<?php

declare(strict_types=1);

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
    public function __construct(
        private readonly SuggestionService $suggestionService
    ){
    }

    /**
     * Display a listing of suggestion news
     *
     * Gets list of suggestion news
     *
     * @apiResourceCollection App\Http\Resources\SuggestionResource
     * @apiResourceModel App\Models\Suggestion
     */
    public function index(): JsonResponse
    {
        $articles = $this->suggestionService->getAll();
        $total = $this->suggestionService->getTotal();

        return response()->json([
            'data' => $articles,
            'total' => $total,
        ]);
    }
}
