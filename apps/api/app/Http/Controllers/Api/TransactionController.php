<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Transaction\IndexTransactionRequest;
use App\Http\Requests\Transaction\StoreTransactionRequest;
use App\Http\Resources\TransactionResource;
use App\Services\TransactionService;
use Illuminate\Http\JsonResponse;

class TransactionController extends Controller
{
    public function __construct(private readonly TransactionService $transactionService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(IndexTransactionRequest $request): JsonResponse
    {
        $result = $this->transactionService->getTransactions($request->validated());

        return $this->listingResponse(TransactionResource::collection($result['data']), $result);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request): JsonResponse
    {
        $transaction = $this->transactionService->createTransaction($request->validated(), $request->user());

        return TransactionResource::make($transaction)
            ->response()
            ->setStatusCode(201);
    }
}
