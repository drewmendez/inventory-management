<?php

namespace App\Http\Resources;

use App\Helpers\DateFormat;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UnitResource extends JsonResource
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
            'name' => $this->name,
            'symbol' => $this->symbol,
            'created_at' => DateFormat::normalize($this->created_at),
            'updated_at' => DateFormat::normalize($this->updated_at),
        ];
    }
}
