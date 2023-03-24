<?php

namespace App\Http\Controllers;

use App\Events\Models\User\UserCreated;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController {
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index(Request $request)
    {
        event(new UserCreated(User::factory()->make()));
        $limit = $request->query('limit', 10);
        $offset = $request->query('offset', 0);

        $users = $this->userService->getPaginated($limit, $offset);

        return response()->json($users);
    }
}
