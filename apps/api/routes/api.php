<?php

use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Api\MeController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', MeController::class);
    Route::get('/items', [ItemController::class, 'index']);
});
