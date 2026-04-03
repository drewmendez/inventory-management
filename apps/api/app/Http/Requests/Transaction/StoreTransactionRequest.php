<?php

namespace App\Http\Requests\Transaction;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => ['required', 'integer', Rule::in([1, 2])],
            'remarks' => ['sometimes', 'nullable', 'string', 'max:1000'],

            'transaction_items' => ['required', 'array', 'min:1'],
            'transaction_items.*.item_id' => ['required', 'integer', 'exists:items,id', 'distinct:strict'],
            'transaction_items.*.quantity' => ['required', 'numeric', 'min:0.01', 'decimal:0,2'],
        ];
    }
}

