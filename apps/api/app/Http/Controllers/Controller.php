<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

abstract class Controller
{
    /**
     * @param  array{data: mixed, paginator_info?: array{current_page: int, last_page: int, per_page: int, total: int}}  $result
     */
    protected function listingResponse(AnonymousResourceCollection $resource, array $result): JsonResponse
    {
        if (isset($result['paginator_info'])) {
            $resource->additional(['paginator_info' => $result['paginator_info']]);
        }

        return $resource->response();
    }
}
