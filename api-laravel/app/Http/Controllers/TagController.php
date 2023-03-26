<?php

namespace App\Http\Controllers;

use App\Http\Resources\TagResource;
use App\Models\Article;
use App\Models\Tag;
use App\Services\TagService;
use Illuminate\Http\Request;

class TagController extends Controller {
    private TagService $tagService;

    public function __construct(TagService $tagService)
    {
        $this->tagService = $tagService;
    }

    public function show(Request $request, int $id)
    {
        $tag = $this->tagService->getById($id);

        return response()->json(new TagResource($tag));
    }

    public function index(Request $request)
    {
        $tags = $this->tagService->getAll();

        return response()->json(TagResource::collection($tags));
    }

    public function store(Request $request)
    {
        $tag = [
            'name' => $request->name,
        ];

        $newTag = $this->tagService->create($tag);

        return response()->json(new TagResource($newTag), 201);
    }

    public function update(Request $request, int $id)
    {
        $tag = [
            'name' => $request->name,
        ];

        $updatedTag = $this->tagService->update($id, $tag);

        return response()->json(new TagResource($updatedTag), 200);
    }

    public function destroy(Request $request, int $id)
    {
        $this->tagService->delete($id);

        return response()->json(null, 204);
    }

}
