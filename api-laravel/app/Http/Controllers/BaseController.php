<?php

namespace App\Http\Controllers;

use GuzzleHttp\Psr7\Request;


abstract class BaseController extends Controller{
    protected $modelClass;

    public function __construct(string $modelClass){
        $this->modelClass = $modelClass;
    }

    public function get(\Illuminate\Http\Request $request, $id): \Illuminate\Http\JsonResponse{
        dump($this->modelClass);
        $model = $this->modelClass::findOrFail($id);
        return response()->json($model);
    }

    public function getAll(\Illuminate\Http\Request $request): \Illuminate\Http\JsonResponse
    {
        $limit = $request->query('limit', 10);
        $offset = $request->query('offset', 0);

        $query = $this->modelClass::query();

        $total = $query->count();

        $data = $query
            ->limit($limit)
            ->offset($offset)
            ->get();

        return response()->json([
            'data' => $data,
            'total' => $total,
        ]);
    }

    public function create(\Illuminate\Http\Request $request): \Illuminate\Http\JsonResponse
    {
        $model = $this->modelClass::create($request->all());
        return response()->json($model, 201);
    }

    public function update(\Illuminate\Http\Request $request, $id): \Illuminate\Http\JsonResponse
    {
        $model = $this->modelClass::findOrFail($id);
        $model->update($request->all());
        return response()->json($model);
    }

    public function delete(\Illuminate\Http\Request $request, $id): \Illuminate\Http\JsonResponse
    {
        $model = $this->modelClass::findOrFail($id);
        $model->delete();
        return response()->json(null, 204);
    }


}