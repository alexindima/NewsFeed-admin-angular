<?php

use Illuminate\Http\Request;
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
/*
Route::prefix('/articles')->group(function () {
    Route::get('/', ['uses' => ArticleController@getAll]);
    Route::get('/{article_id}', ['uses' => ArticleController@getOne]);
    Route::post('/', ['uses' => ArticleController@create]);
    Route::patch('/{article_id}', ['uses' => ArticleController@update]);
    Route::delete('/{article_id}', ['uses' => ArticleController@delete])->where(['article_id' => '[0-9+]']);
});

Route::prefix('/suggested')->group(function () {
    Route::get('/', ['uses' => SuggestedController@getArticles]);
    Route::get('/{article_id}', ['uses' => SuggestedController@getArticle]);
    Route::post('/', ['uses' => SuggestedController@createArticle]);
    Route::patch('/{article_id}', ['uses' => SuggestedController@editArticle]);
    Route::delete('/{article_id}', ['uses' => SuggestedController@deleteArticle])->where(['article_id' => '[0-9+]']);
});

Route::prefix('/users')->group(function () {
    Route::get('/', ['uses' => UserController@getUsers]);
    Route::get('/{user_id}', ['uses' => UserController@getUser]);
    Route::post('/', ['uses' => UserController@createUser]);
    Route::patch('/{user_id}', ['uses' => UserController@editUser]);
    Route::delete('/{user_id}', ['uses' => UserController@deleteUser])->where(['user_id' => '[0-9+]']);
});

Route::prefix('/categories')->group(function () {
    Route::get('/', ['uses' => CategoryController@getCategories]);
    Route::get('/{category_id}', ['uses' => CategoryController@getCategory]);
    Route::post('/', ['uses' => CategoryController@createCategory]);
    Route::patch('/{category_id}', ['uses' => CategoryController@editCategory]);
    Route::delete('/{category_id}', ['uses' => CategoryController@deleteCategory])->where(['category_id' => '[0-9+]']);
});

Route::prefix('/tags')->group(function () {
    Route::get('/', ['uses' => TagController@getTags]);
    Route::get('/{tag_id}', ['uses' => TagController@getTag]);
    Route::post('/', ['uses' => TagController@createTag]);
    Route::patch('/{tag_id}', ['uses' => TagController@editTag]);
    Route::delete('/{tag_id}', ['uses' => TagController@deleteTag])->where(['tag_id' => '[0-9+]']);
});*/
