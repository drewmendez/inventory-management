<?php

namespace App\Http\Resources;

use App\Helpers\DateFormat;
use App\Helpers\NumberFormat;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InventoryMovementResource extends JsonResource
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
            'from_quantity' => NumberFormat::trimTrailingZeros($this->from_quantity),
            'to_quantity' => NumberFormat::trimTrailingZeros($this->to_quantity),
            'transaction_item' => new TransactionItemResource($this->transactionItem),
            'created_at' => DateFormat::normalize($this->created_at),
            'updated_at' => DateFormat::normalize($this->updated_at),
        ];
    }
}
