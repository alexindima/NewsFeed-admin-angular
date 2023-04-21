<?php

use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// а это всё еще нужно?
Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);

    return ['token' => $token->plainTextToken];
});

if(\Illuminate\Support\Facades\App::environment('local'))
{

    Route::get('/playground', function (){
        $user = \App\Models\User::factory()->make();
        \Illuminate\Support\Facades\Mail::to($user)
            ->send(new \App\Mail\WelcomeMail($user));

        return null;
    });
}

/*Route::get('/a/c', function (){
    return 'fdsfsdfsf';
});*/
