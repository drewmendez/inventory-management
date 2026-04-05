<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Item\IndexItemRequest;
use App\Http\Requests\Item\StoreItemRequest;
use App\Http\Requests\Item\UpdateItemRequest;
use App\Http\Resources\ItemResource;
use App\Models\Item;
use App\Services\ItemService;
use Illuminate\Http\JsonResponse;

class ItemController extends Controller
{
    public function __construct(private readonly ItemService $itemService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(IndexItemRequest $request): JsonResponse
    {
        $result = $this->itemService->getItems($request->validated());

        return $this->listingResponse(ItemResource::collection($result['data']), $result);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreItemRequest $request): JsonResponse
    {
        $item = $this->itemService->createItem($request->validated());
        $item->load(['category', 'unit']);

        return ItemResource::make($item)
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateItemRequest $request, Item $item): JsonResponse
    {
        $item = $this->itemService->updateItem($item, $request->validated());
        $item->load(['category', 'unit']);

        return ItemResource::make($item)->response();
    }
}
