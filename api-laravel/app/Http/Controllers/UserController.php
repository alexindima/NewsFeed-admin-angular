<?php

namespace App\Http\Controllers;

use App\Events\Models\User\UserCreated;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\DbModels\User;
use App\Models\OperationResult;
use App\Models\PagingModel;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;

/**
 * @group User Management
 *
 * APIs to manage the user resource.
 */
class UserController extends Controller{
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Display a listing of users
     *
     * Gets list of users
     *
     * @queryParam limit int Size per page. Default to 10. Example: 5
     * @queryParam offset int Page to view. Example: 1
     *
     * @apiResourceCollection App\Http\Resources\UserResource
     * @apiResourceModel App\Models\User
     */
    public function index(Request $request): JsonResponse
    {
        $limit = $request->query('limit', 10);
        $offset = $request->query('offset', 0);

        $users = $this->userService->getPaginated($limit, $offset);
        $total = $this->userService->getTotalCount();

        $data = new PagingModel(UserResource::collection($users), $total);
        $result = OperationResult::success($data);

        return response()->json($result);
    }

    /**
     * Display the specific user
     *
     * @urlParam id int required User ID
     * @apiResource App\Http\Resources\UserResource
     * @apiResourceModel App\Models\User
     */
    public function show(int $id): JsonResponse
    {
        $user = $this->userService->getById($id);
        $result = OperationResult::success(new UserResource($user));

        return response()->json($result);
    }

    /**
     * Store a newly created resource in storage
     *
     * @bodyParam name string required Name of the user. Example: John Doe
     * @bodyParam email string required Email of the user. Example: john@doe.com
     * @bodyParam password string required Password of the user. Example: dsg65g15dsf1g65dsf4g651dsf65gh498ds4fgb5
     * @bodyParam categories array Ignored categories for user. Example: Ecology
     * @bodyParam tags array Ignored tags for user.
     * @apiResource App\Http\Resources\UserResource
     * @apiResourceModel App\Models\User
     */
    public function store(UserStoreRequest $request): JsonResponse
    {
        $user = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'categories' => $request->categories,
            'tags' => $request->tags,
        ];

        $newUser = $this->userService->create($user);
        /** @var User $newUser */
        event(new UserCreated($newUser));
        $result = OperationResult::success(new UserResource($newUser), "User '{$request->email}' created");

        return response()->json($result, 201);
    }

    /**
     * Update a resource in storage
     *
     * @urlParam id int required User ID
     * @bodyParam name string required Name of the user. Example: John Doe
     * @bodyParam email string required Email of the user. Example: john@doe.com
     * @bodyParam password string required Password of the user. Example: dsg65g15dsf1g65dsf4g651dsf65gh498ds4fgb5
     * @bodyParam categories array Ignored categories for user. Example: Ecology
     * @bodyParam tags array Ignored tags for user.
     * @apiResource App\Http\Resources\UserResource
     * @apiResourceModel App\Models\User
     */
    public function update(UserUpdateRequest $request, int $id): JsonResponse
    {
        $original = $this->userService->getById($id);
        $user = [
            'name' => $request->name ?? $original->name,
            'email' => $request->email ?? $original->email,
            'password' => $request->password ?? $original->password,
            'categories' => $request->categories,
            'tags' => $request->tags,
        ];

        $originalName = $this->userService->getById($id)->email;
        $updatedUser = $this->userService->update($id, $user);
        $result = OperationResult::success(new UserResource($updatedUser), "User '{$originalName}' changed");

        return response()->json($result);
    }

    /**
     * Remove the specific user
     *
     * @urlParam id int required User ID
     * @apiResource App\Http\Resources\UserResource
     * @apiResourceModel App\Models\User
     */
    public function destroy(int $id): JsonResponse
    {
        $email = $this->userService->getById($id)->email;
        $this->userService->delete($id);
        $result = OperationResult::success(null, "User '{$email}' deleted");

        return response()->json($result);
    }
}
