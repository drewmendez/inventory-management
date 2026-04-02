<?php

namespace App\Http\Resources;

use App\Helpers\DateFormat;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
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
            'reference_number' => $this->reference_number,
            'type' => match ((int) $this->type) {
                1 => 'Stock In',
                2 => 'Stock Out',
                default => 'Unknown',
            },
            'remarks' => $this->remarks,
            'user' => new UserResource($this->user),
            'transaction_items' => TransactionItemResource::collection($this->transactionItems),
            'created_at' => DateFormat::normalize($this->created_at),
            'updated_at' => DateFormat::normalize($this->updated_at),
        ];
    }
}
