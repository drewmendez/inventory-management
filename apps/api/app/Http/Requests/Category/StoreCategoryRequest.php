<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('prefix')) {
            $this->merge([
                'prefix' => strtoupper((string) $this->input('prefix')),
            ]);
        }
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'prefix' => [
                'required',
                'string',
                'size:3',
                'regex:/^[A-Z0-9]{3}$/',
                Rule::unique('categories', 'prefix'),
            ],
        ];
    }
}
