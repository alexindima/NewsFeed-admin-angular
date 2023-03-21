<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::apiResource('articles', \App\Http\Controllers\ArticleController::class);
Route::apiResource('users', \App\Http\Controllers\UserController::class);
Route::apiResource('suggested', \App\Http\Controllers\SuggestionController::class);
Route::apiResource('categories', \App\Http\Controllers\CategoryController::class);
Route::apiResource('tags', \App\Http\Controllers\TagController::class);

/*Route::prefix('/articles')->group(function () {
    Route::get('/', [\App\Http\Controllers\ArticleController::class, 'index']);
    Route::get('/{article_id}', [\App\Http\Controllers\ArticleController::class, 'show']);
    Route::post('/', [\App\Http\Controllers\ArticleController::class, 'store']);
    Route::patch('/{article_id}', [\App\Http\Controllers\ArticleController::class, 'update']);
    Route::delete('/{article_id}', [\App\Http\Controllers\ArticleController::class, 'destroy']);
});

Route::prefix('/suggested')->group(function () {
    Route::get('/', [\App\Http\Controllers\SuggestionController::class, 'index']);
    Route::get('/{article_id}', [\App\Http\Controllers\SuggestionController::class, 'show']);
    Route::post('/', [\App\Http\Controllers\SuggestionController::class, 'store']);
    Route::patch('/{article_id}', [\App\Http\Controllers\SuggestionController::class, 'update']);
    Route::delete('/{article_id}', [\App\Http\Controllers\SuggestionController::class, 'destroy']);
});

Route::prefix('/users')->group(function () {
    Route::get('/', [\App\Http\Controllers\UserController::class, 'index']);
    Route::get('/{user_id}', [\App\Http\Controllers\UserController::class, 'show']);
    Route::post('/', [\App\Http\Controllers\UserController::class, 'store']);
    Route::patch('/{user_id}', [\App\Http\Controllers\UserController::class, 'update']);
    Route::delete('/{user_id}', [\App\Http\Controllers\UserController::class, 'destroy']);
});

Route::prefix('/categories')->group(function () {
    Route::get('/', [\App\Http\Controllers\CategoryController::class, 'index']);
    Route::get('/{category_id}', [\App\Http\Controllers\CategoryController::class, 'show']);
    Route::post('/', [\App\Http\Controllers\CategoryController::class, 'store']);
    Route::patch('/{category_id}', [\App\Http\Controllers\CategoryController::class, 'update']);
    Route::delete('/{category_id}', [\App\Http\Controllers\CategoryController::class, 'destroy']);
});

Route::prefix('/tags')->group(function () {
    Route::get('/', [\App\Http\Controllers\TagController::class, 'index']);
    Route::get('/{tag_id}', [\App\Http\Controllers\TagController::class, 'show']);
    Route::post('/', [\App\Http\Controllers\TagController::class, 'store']);
    Route::patch('/{tag_id}', [\App\Http\Controllers\TagController::class, 'update']);
    Route::delete('/{tag_id}', [\App\Http\Controllers\TagController::class, 'destroy']);
});*/
