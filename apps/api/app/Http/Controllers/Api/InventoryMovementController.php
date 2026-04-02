<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\InventoryMovement\IndexInventoryMovementRequest;
use App\Http\Resources\InventoryMovementResource;
use App\Services\InventoryMovementService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InventoryMovementController extends Controller
{
    public function __construct(private readonly InventoryMovementService $inventoryMovementService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(IndexInventoryMovementRequest $request): JsonResponse
    {
        $result = $this->inventoryMovementService->getInventoryMovements($request->validated());

        return InventoryMovementResource::collection($result['data'])
            ->additional(['paginator_info' => $result['paginator_info']])
            ->response();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
