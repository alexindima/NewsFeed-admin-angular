<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['string'],
        ];
    }

    public function messages()
    {
        return [
            'name.string' => 'You must use string for the name',
        ];
    }
}
