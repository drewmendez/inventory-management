<?php

namespace App\Http\Resources;

use App\Helpers\DateFormat;
use App\Helpers\NumberFormat;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'quantity' => NumberFormat::trimTrailingZeros($this->quantity),
            'item' => new ItemResource($this->item),
            'created_at' => DateFormat::normalize($this->created_at),
            'updated_at' => DateFormat::normalize($this->updated_at),
        ];
    }
}
