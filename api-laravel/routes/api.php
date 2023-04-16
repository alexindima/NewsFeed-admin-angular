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

/*Route::prefix('/articles')->group(function () {
    Route::get('/', [\App\Http\Controllers\ArticleController::class, 'index']);
    Route::get('/{id}', [\App\Http\Controllers\ArticleController::class, 'show']);
    Route::post('/', [\App\Http\Controllers\ArticleController::class, 'store'])->middleware('admin');
    Route::patch('/{id}', [\App\Http\Controllers\ArticleController::class, 'update'])->middleware('admin');
    Route::delete('/{id}', [\App\Http\Controllers\ArticleController::class, 'destroy'])->middleware('admin');
});

Route::prefix('/suggested')->group(function () {
    Route::get('/', [\App\Http\Controllers\SuggestionController::class, 'index']);
    Route::get('/{id}', [\App\Http\Controllers\SuggestionController::class, 'show']);
    Route::post('/', [\App\Http\Controllers\SuggestionController::class, 'store'])->middleware('admin');
    Route::patch('/{id}', [\App\Http\Controllers\SuggestionController::class, 'update'])->middleware('admin');
    Route::delete('/{id}', [\App\Http\Controllers\SuggestionController::class, 'destroy'])->middleware('admin');
});

Route::prefix('/users')->group(function () {
    Route::get('/', [\App\Http\Controllers\UserController::class, 'index'])->middleware('admin');
    Route::get('/{id}', [\App\Http\Controllers\UserController::class, 'show'])->middleware('registered');
    Route::post('/', [\App\Http\Controllers\UserController::class, 'store'])->middleware('admin');
    Route::patch('/{id}', [\App\Http\Controllers\UserController::class, 'update'])->middleware('admin');
    Route::delete('/{id}', [\App\Http\Controllers\UserController::class, 'destroy'])->middleware('admin');
});

Route::prefix('/categories')->group(function () {
    Route::get('/', [\App\Http\Controllers\CategoryController::class, 'index']);
    Route::get('/{category_id}', [\App\Http\Controllers\CategoryController::class, 'show']);
    Route::post('/', [\App\Http\Controllers\CategoryController::class, 'store'])->middleware('admin');
    Route::patch('/{category_id}', [\App\Http\Controllers\CategoryController::class, 'update'])->middleware('admin');
    Route::delete('/{category_id}', [\App\Http\Controllers\CategoryController::class, 'destroy'])->middleware('admin');
});

Route::prefix('/tags')->group(function () {
    Route::get('/', [\App\Http\Controllers\TagController::class, 'index']);
    Route::get('/{tag_id}', [\App\Http\Controllers\TagController::class, 'show']);
    Route::post('/', [\App\Http\Controllers\TagController::class, 'store'])->middleware('admin');
    Route::patch('/{tag_id}', [\App\Http\Controllers\TagController::class, 'update'])->middleware('admin');
    Route::delete('/{tag_id}', [\App\Http\Controllers\TagController::class, 'destroy'])->middleware('admin');
});*/


Route::middleware(['admin'])->group(function () {
    Route::prefix('/articles')->group(function () {
        Route::post('/', [\App\Http\Controllers\ArticleController::class, 'store']);
        Route::patch('/{id}', [\App\Http\Controllers\ArticleController::class, 'update']);
        Route::delete('/{id}', [\App\Http\Controllers\ArticleController::class, 'destroy']);
    });

    Route::prefix('/suggested')->group(function () {
        Route::post('/', [\App\Http\Controllers\SuggestionController::class, 'store']);
        Route::patch('/{id}', [\App\Http\Controllers\SuggestionController::class, 'update']);
        Route::delete('/{id}', [\App\Http\Controllers\SuggestionController::class, 'destroy']);
    });

    Route::prefix('/users')->group(function () {
        Route::get('/', [\App\Http\Controllers\UserController::class, 'index']);
        Route::post('/', [\App\Http\Controllers\UserController::class, 'store']);
        Route::patch('/{id}', [\App\Http\Controllers\UserController::class, 'update']);
        Route::delete('/{id}', [\App\Http\Controllers\UserController::class, 'destroy']);
    });

    Route::prefix('/categories')->group(function () {
        Route::post('/', [\App\Http\Controllers\CategoryController::class, 'store']);
        Route::patch('/{category_id}', [\App\Http\Controllers\CategoryController::class, 'update']);
        Route::delete('/{category_id}', [\App\Http\Controllers\CategoryController::class, 'destroy']);
    });

    Route::prefix('/tags')->group(function () {
        Route::post('/', [\App\Http\Controllers\TagController::class, 'store']);
        Route::patch('/{tag_id}', [\App\Http\Controllers\TagController::class, 'update']);
        Route::delete('/{tag_id}', [\App\Http\Controllers\TagController::class, 'destroy']);
    });

    // Similarly, update other routes with common middleware
});

Route::middleware(['registered'])->group(function () {
    Route::get('/{id}', [\App\Http\Controllers\UserController::class, 'show']);

});

Route::prefix('/articles')->group(function () {
    Route::get('/', [\App\Http\Controllers\ArticleController::class, 'index']);
    Route::get('/{id}', [\App\Http\Controllers\ArticleController::class, 'show']);
});

Route::prefix('/suggested')->group(function () {
    Route::get('/', [\App\Http\Controllers\SuggestionController::class, 'index']);
    Route::get('/{id}', [\App\Http\Controllers\SuggestionController::class, 'show']);
});


Route::prefix('/categories')->group(function () {
    Route::get('/', [\App\Http\Controllers\CategoryController::class, 'index']);
    Route::get('/{category_id}', [\App\Http\Controllers\CategoryController::class, 'show']);
});

Route::prefix('/tags')->group(function () {
    Route::get('/', [\App\Http\Controllers\TagController::class, 'index']);
    Route::get('/{tag_id}', [\App\Http\Controllers\TagController::class, 'show']);
});
