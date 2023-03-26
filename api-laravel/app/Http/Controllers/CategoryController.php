<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Services\CategoryService;
use Illuminate\Http\Request;

class CategoryController extends Controller {
    private CategoryService $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function show(Request $request, int $id)
    {
        $category = $this->categoryService->getById($id);

        return response()->json(new CategoryResource($category));
    }

    public function index(Request $request)
    {
        $categories = $this->categoryService->getAll();

        return response()->json(CategoryResource::collection($categories));
    }

    public function store(Request $request)
    {
        $category = [
            'name' => $request->name,
        ];

        $newCategory = $this->categoryService->create($category);

        return response()->json(new CategoryResource($newCategory), 201);
    }

    public function update(Request $request, int $id)
    {
        $category = [
            'name' => $request->name,
        ];

        $updatedCategory = $this->categoryService->update($id, $category);

        return response()->json(new CategoryResource($updatedCategory), 200);
    }

    public function destroy(Request $request, int $id)
    {
        $this->categoryService->delete($id);

        return response()->json(null, 204);
    }
}
