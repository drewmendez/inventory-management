<?php

namespace App\Http\Requests\Item;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IndexItemRequest extends FormRequest
{
    private const SORTABLE_COLUMNS = [
        'sku',
        'name',
        'quantity',
        'reorder_level',
        'created_at',
        'updated_at',
    ];

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
            'sort_by' => ['sometimes', 'string', Rule::in(self::SORTABLE_COLUMNS)],
            'sort_order' => ['sometimes', 'string', Rule::in(['asc', 'desc'])],
            'search' => ['sometimes', 'string', 'max:255'],

            // Filterable fields
            'category_id' => ['sometimes', 'integer', 'exists:categories,id'],
            'unit_id' => ['sometimes', 'integer', 'exists:units,id'],
            'status' => ['sometimes', 'string', Rule::in(['normal', 'low_stock'])],
        ];
    }
}
