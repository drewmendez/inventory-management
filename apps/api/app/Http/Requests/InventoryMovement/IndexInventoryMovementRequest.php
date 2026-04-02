<?php

namespace App\Http\Requests\InventoryMovement;

use Illuminate\Foundation\Http\FormRequest;

class IndexInventoryMovementRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'page' => ['sometimes', 'integer', 'min:1'],
            'per_page' => ['sometimes', 'integer', 'min:10', 'max:100'],
            'search' => ['sometimes', 'string', 'max:255'],
        ];
    }
}
