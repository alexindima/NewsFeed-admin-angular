<?php

namespace App\Http\Controllers;

use App\Http\Resources\SuggestionResource;
use App\Models\Suggestion;
use App\Services\ArticleService;
use App\Services\SuggestionService;
use Illuminate\Http\Request;

class SuggestionController extends Controller {
    private SuggestionService $suggestionService;

    public function __construct(SuggestionService $suggestionService)
    {
        $this->suggestionService = $suggestionService;
    }

    public function show(Request $request, int $id)
    {
        $news = $this->suggestionService->getById($id);

        return response()->json(new SuggestionResource($news));
    }

    public function index(Request $request)
    {
        $news = $this->suggestionService->getAll();

        return response()->json(SuggestionResource::collection($news));
    }

    public function store(Request $request)
    {
        $news = [
            'news' => $request->news,
        ];

        $newNews = $this->suggestionService->create($news);

        return response()->json(new SuggestionResource($newNews), 201);
    }

    public function update(Request $request, int $id)
    {
        $news = [
            'news' => $request->news,
        ];

        $updatedNews = $this->suggestionService->update($id, $news);

        return response()->json(new SuggestionResource($updatedNews), 200);
    }

    public function destroy(Request $request, int $id)
    {
        $this->suggestionService->delete($id);

        return response()->json(null, 204);
    }
}
