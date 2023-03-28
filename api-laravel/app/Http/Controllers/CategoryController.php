<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryStoreRequest;
use App\Http\Requests\CategoryUpdateRequest;
use App\Http\Resources\CategoryResource;
use App\Services\CategoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * @group Category Management
 *
 * APIs to manage the category resource.
 */
class CategoryController extends Controller {
    private CategoryService $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    /**
     * Display a listing of categories
     *
     * Gets list of categories
     *
     * @apiResourceCollection App\Http\Resources\CategoryResource
     * @apiResourceModel App\Models\Category
     */
    public function index(Request $request): JsonResponse
    {
        $categories = $this->categoryService->getAll();

        return response()->json(CategoryResource::collection($categories));
    }

    /**
     * Display the specific category
     *
     * @urlParam id int required Category ID
     * @apiResource App\Http\Resources\CategoryResource
     * @apiResourceModel App\Models\Category
     */
    public function show(Request $request, int $id): JsonResponse
    {
        $category = $this->categoryService->getById($id);

        return response()->json(new CategoryResource($category));
    }

    /**
     * Store a newly created resource in storage
     *
     * @bodyParam name string required Name of the category. Example: "tag1"
     * @apiResource App\Http\Resources\CategoryResource
     * @apiResourceModel App\Models\Category
     */
    public function store(CategoryStoreRequest $request): JsonResponse
    {
        $category = [
            'name' => $request->name,
        ];

        $newCategory = $this->categoryService->create($category);

        return response()->json(new CategoryResource($newCategory), 201);
    }

    /**
     * Update a resource in storage
     *
     * @urlParam id int required Category ID
     * @bodyParam name string required Name of the category. Example: "tag1"
     * @apiResource App\Http\Resources\CategoryResource
     * @apiResourceModel App\Models\Category
     */
    public function update(CategoryUpdateRequest $request, int $id): JsonResponse
    {
        $category = [
            'name' => $request->name,
        ];

        $updatedCategory = $this->categoryService->update($id, $category);

        return response()->json(new CategoryResource($updatedCategory), 200);
    }

    /**
     * Remove the specific category
     *
     * @urlParam id int required Category ID
     * @response 204 {
        "data": "true"
     * }
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        $this->categoryService->delete($id);

        return response()->json(["data"=> "true"], 204);
    }
}
