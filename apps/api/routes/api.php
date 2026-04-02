<?php

use App\Http\Controllers\Api\InventoryMovementController;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Api\MeController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', MeController::class);
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/items', [ItemController::class, 'index']);
    Route::get('/transactions', [TransactionController::class, 'index']);
    Route::get('/inventory-movements', [InventoryMovementController::class, 'index']);
});
