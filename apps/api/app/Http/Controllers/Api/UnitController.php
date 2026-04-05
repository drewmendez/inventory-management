<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Unit\IndexUnitRequest;
use App\Http\Requests\Unit\StoreUnitRequest;
use App\Http\Requests\Unit\UpdateUnitRequest;
use App\Http\Resources\UnitResource;
use App\Models\Unit;
use App\Services\UnitService;
use Illuminate\Http\JsonResponse;

class UnitController extends Controller
{
    public function __construct(private readonly UnitService $unitService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(IndexUnitRequest $request): JsonResponse
    {
        $result = $this->unitService->getUnits($request->validated());

        return $this->listingResponse(UnitResource::collection($result['data']), $result);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUnitRequest $request): JsonResponse
    {
        $unit = $this->unitService->createUnit($request->validated());

        return UnitResource::make($unit)
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUnitRequest $request, Unit $unit): JsonResponse
    {
        $unit = $this->unitService->updateUnit($unit, $request->validated());

        return UnitResource::make($unit)->response();
    }
}
