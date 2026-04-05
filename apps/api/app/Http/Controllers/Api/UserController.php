<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\IndexUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function __construct(private readonly UserService $userService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(IndexUserRequest $request): JsonResponse
    {
        $result = $this->userService->getUsers($request->validated());

        return $this->listingResponse(UserResource::collection($result['data']), $result);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        $user = $this->userService->updateUser($user, $request->validated());

        return UserResource::make($user)->response();
    }
}
