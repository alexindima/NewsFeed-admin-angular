<?php

namespace App\Http\Controllers;

use App\Events\Models\User\UserCreated;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller{
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function show(Request $request, int $id)
    {
        $user = $this->userService->getById($id);
        return response()->json(new UserResource($user));
    }

    public function index(Request $request)
    {
        $limit = $request->query('limit', 10);
        $offset = $request->query('offset', 0);

        $users = $this->userService->getPaginated($limit, $offset);
        $total = $this->userService->getTotalCount();

        return response()->json([
            'data' => UserResource::collection($users),
            'total' => $total,
        ]);
    }

    public function store(Request $request)
    {
        $user = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ];

        $newUser = $this->userService->create($user);

        return response()->json(new UserResource($newUser), 201);
    }

    public function update(Request $request, int $id)
    {
        $original = $this->userService->getById($id);
        $user = [
            'name' => $request->name ?? $original->name,
            'email' => $request->email ?? $original->email,
            'password' => $request->password ?? $original->password,
        ];

        $updatedUser = $this->userService->update($id, $user);

        return response()->json(new UserResource($updatedUser), 200);
    }

    public function destroy(Request $request, int $id)
    {
        $this->userService->delete($id);

        return response()->json(null, 204);
    }
}
