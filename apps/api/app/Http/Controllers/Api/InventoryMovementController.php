<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\InventoryMovement\IndexInventoryMovementRequest;
use App\Http\Resources\InventoryMovementResource;
use App\Services\InventoryMovementService;
use Illuminate\Http\JsonResponse;

class InventoryMovementController extends Controller
{
    public function __construct(private readonly InventoryMovementService $inventoryMovementService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(IndexInventoryMovementRequest $request): JsonResponse
    {
        $result = $this->inventoryMovementService->getInventoryMovements($request->validated());

        return $this->listingResponse(InventoryMovementResource::collection($result['data']), $result);
    }
}
