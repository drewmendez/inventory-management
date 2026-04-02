<?php

namespace App\Http\Requests\Unit;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IndexUnitRequest extends FormRequest
{
    private const SORTABLE_COLUMNS = [
        'name',
        'symbol',
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
        ];
    }
}
