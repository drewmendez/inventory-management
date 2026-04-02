<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Unit\IndexUnitRequest;
use App\Http\Resources\UnitResource;
use App\Services\UnitService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    public function __construct(private readonly UnitService $unitService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(IndexUnitRequest $request): JsonResponse
    {
        $result = $this->unitService->getUnits($request->validated());

        return UnitResource::collection($result['data'])
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
