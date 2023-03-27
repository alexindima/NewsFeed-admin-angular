<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['string', 'required'],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Please enter a value for the name',
            'name.string' => 'You must use string for the name',
        ];
    }
}
