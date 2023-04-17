<?php

namespace App\Http\Controllers;

use App\Http\Requests\TagStoreRequest;
use App\Http\Requests\TagUpdateRequest;
use App\Http\Resources\TagResource;
use App\DbModels\Article;
use App\DbModels\Tag;
use App\Models\OperationResult;
use App\Services\TagService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * @group Tag Management
 *
 * APIs to manage the tag resource.
 */
class TagController extends Controller {
    private TagService $tagService;

    public function __construct(TagService $tagService)
    {
        $this->tagService = $tagService;
    }

    /**
     * Display a listing of tags
     *
     * Gets list of tags
     *
     * @apiResourceCollection App\Http\Resources\TagResource
     * @apiResourceModel App\Models\Tag
     */
    public function index(): JsonResponse
    {
        $tags = $this->tagService->getAll();
        $result = OperationResult::success(TagResource::collection($tags));

        return response()->json($result);
    }

    /**
     * Store a newly created resource in storage
     *
     * @bodyParam name string required Name of the tag. Example: "tag1"
     * @apiResource App\Http\Resources\TagResource
     * @apiResourceModel App\Models\Tag
     */
    public function store(TagStoreRequest $request): JsonResponse
    {
        $tag = [
            'name' => $request->name,
        ];

        $newTag = $this->tagService->create($tag);
        $result = OperationResult::success(new TagResource($newTag), "Tag '{$request->name}' created");

        return response()->json($result, 201);
    }

    /**
     * Update a resource in storage
     *
     * @urlParam id int required Tag ID
     * @bodyParam name string required Name of the tag. Example: "tag1"
     * @apiResource App\Http\Resources\TagResource
     * @apiResourceModel App\Models\Tag
     */
    public function update(TagUpdateRequest $request, int $id): JsonResponse
    {
        $tag = [
            'name' => $request->name,
        ];

        $originalName = $this->tagService->getById($id)->name;
        $updatedTag = $this->tagService->update($id, $tag);
        $result = OperationResult::success(new TagResource($updatedTag), "Tag '{$originalName}' changed to '{$request->name}'");

        return response()->json($result);
    }

    /**
     * Remove the specific tag
     *
     * @urlParam id int required Tag ID
     * @apiResource App\Http\Resources\TagResource
     * @apiResourceModel App\Models\Tag
     */
    public function destroy(int $id): JsonResponse
    {
        $name = $this->tagService->getById($id)->name;
        $this->tagService->delete($id);
        $result = OperationResult::success(null, "Tag '{$name}' deleted");

        return response()->json($result);
    }

}
