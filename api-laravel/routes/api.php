<?php

// этот файл почему то оказался в этом неймспейсе, поэтому нижние юзинги не нужны
// но по хорошему этот неймспейс я бы убрал, и оставил те юзинги
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;

// WTF????????????????????????????
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\SuggestionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TagController;

use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\RegisteredMiddleware;

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

Route::middleware(AdminMiddleware::class)->group(function () {
    Route::prefix('/articles')->group(function () {
        Route::post('/', [ArticleController::class, 'store']);
        Route::patch('/{id}', [ArticleController::class, 'update']);
        Route::delete('/{id}', [ArticleController::class, 'destroy']);
    });

    Route::prefix('/users')->group(function () {
        //Route::get('/', [UserController::class, 'index']);
        Route::post('/', [UserController::class, 'store']);
        Route::patch('/{id}', [UserController::class, 'update']);
        Route::delete('/{id}', [UserController::class, 'destroy']);
    });

    Route::prefix('/categories')->group(function () {
        Route::post('/', [CategoryController::class, 'store']);
        Route::patch('/{category_id}', [CategoryController::class, 'update']);
        Route::delete('/{category_id}', [CategoryController::class, 'destroy']);
    });

    Route::prefix('/tags')->group(function () {
        Route::post('/', [TagController::class, 'store']);
        Route::patch('/{tag_id}', [TagController::class, 'update']);
        Route::delete('/{tag_id}', [TagController::class, 'destroy']);
    });
});

Route::middleware(RegisteredMiddleware::class)->group(function () {
    Route::prefix('/users')->group(function () {
        Route::get('/{id}', [UserController::class, 'show']);
    });
});

Route::prefix('/articles')->group(function () {
    // как я понял тут будут 2 квери параметра, с помощью where() можешь указать что
    // это за параметры а с помощью регулярок их валидировать
    Route::get('/', [ArticleController::class, 'index']);
    Route::get('/{id}', [ArticleController::class, 'show']);
});

Route::prefix('/users')->group(function () {
    Route::get('/', [UserController::class, 'index']);
});

Route::prefix('/suggested')->group(function () {
    Route::get('/', [SuggestionController::class, 'index']);
});

Route::prefix('/categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::get('/{category_id}', [CategoryController::class, 'show']);
});

Route::prefix('/tags')->group(function () {
    Route::get('/', [TagController::class, 'index']);
    Route::get('/{tag_id}', [TagController::class, 'show']);
});
