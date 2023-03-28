<?php

namespace App\Http\Controllers;

use App\Http\Requests\TagStoreRequest;
use App\Http\Requests\TagUpdateRequest;
use App\Http\Resources\TagResource;
use App\Models\Article;
use App\Models\Tag;
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
    public function index(Request $request): JsonResponse
    {
        $tags = $this->tagService->getAll();

        return response()->json(TagResource::collection($tags));
    }

    /**
     * Display the specific tag
     *
     * @urlParam id int required Tag ID
     * @apiResource App\Http\Resources\TagResource
     * @apiResourceModel App\Models\Tag
     */
    public function show(Request $request, int $id): JsonResponse
    {
        $tag = $this->tagService->getById($id);

        return response()->json(new TagResource($tag));
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

        return response()->json(new TagResource($newTag), 201);
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

        $updatedTag = $this->tagService->update($id, $tag);

        return response()->json(new TagResource($updatedTag), 200);
    }

    /**
     * Remove the specific tag
     *
     * @urlParam id int required Tag ID
     * @response 204 {
        "data": "true"
     * }
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        $this->tagService->delete($id);

        return response()->json(["data"=> "true"], 204);
    }

}
