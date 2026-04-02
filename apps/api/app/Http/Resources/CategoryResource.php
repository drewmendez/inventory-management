<?php

namespace App\Http\Resources;

use App\Helpers\DateFormat;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
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
            'prefix' => $this->prefix,
            'created_at' => DateFormat::normalize($this->created_at),
            'updated_at' => DateFormat::normalize($this->updated_at),
        ];
    }
}
