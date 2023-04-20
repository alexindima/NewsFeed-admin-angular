<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\CategoryStoreRequest;
use App\Http\Requests\CategoryUpdateRequest;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\CategoryResource;
use App\Models\OperationResult;
use App\Models\PagingModel;
use App\Services\CategoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * @group Category Management
 *
 * APIs to manage the category resource.
 */
class CategoryController extends Controller {
    public function __construct(
        private readonly CategoryService $categoryService
    ){
    }

    /**
     * Display a listing of categories
     *
     * Gets list of categories
     *
     * @apiResourceCollection App\Http\Resources\CategoryResource
     * @apiResourceModel App\Models\Category
     */
    public function index(): JsonResponse
    {
        $categories = $this->categoryService->getAll();
        $result = OperationResult::success(CategoryResource::collection($categories));

        return response()->json($result);
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
        $result = OperationResult::success(new CategoryResource($newCategory), "Category '{$request->name}' created");

        return response()->json($result, 201);
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

        $originalName = $this->categoryService->getById($id)->name;
        $updatedCategory = $this->categoryService->update($id, $category);
        $result = OperationResult::success(new CategoryResource($updatedCategory), "Category '{$originalName}' changed to '{$request->name}'");

        return response()->json($result);
    }

    /**
     * Remove the specific category
     *
     * @urlParam id int required Category ID
     * @apiResource App\Http\Resources\CategoryResource
     * @apiResourceModel App\Models\Category
     * }
     */
    public function destroy(int $id): JsonResponse
    {
        $name = $this->categoryService->getById($id)->name;
        $this->categoryService->delete($id);
        $result = OperationResult::success(null, "Category '{$name}' deleted");

        return response()->json($result);
    }
}
