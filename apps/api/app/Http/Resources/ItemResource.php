<?php

namespace App\Http\Resources;

use App\Helpers\DateFormat;
use App\Helpers\NumberFormat;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
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
            'sku' => $this->sku,
            'name' => $this->name,
            'quantity' => NumberFormat::trimTrailingZeros($this->quantity),
            'reorder_level' => NumberFormat::trimTrailingZeros($this->reorder_level),
            'status' => $this->quantity <= $this->reorder_level ? 'Low Stock' : 'Normal',
            'category' => new CategoryResource($this->category),
            'unit' => new UnitResource($this->unit),
            'created_at' => DateFormat::normalize($this->created_at),
            'updated_at' => DateFormat::normalize($this->updated_at),
        ];
    }
}
