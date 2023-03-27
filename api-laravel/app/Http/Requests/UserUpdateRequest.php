<?php

namespace App\Http\Requests;

use App\Rules\StringArray;
use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['string'],
            'email' => ['string'],
            'password' => ['string'],
            'categories' => [
                'array',
                new StringArray(),
            ],
            'tags' => [
                'array',
                new StringArray(),
            ],
        ];
    }

    public function messages()
    {
        return [
            'name.string' => 'You must use string for the name',
            'email.string' => 'You must use string for the email',
            'password.string' => 'You must use string for the password',
        ];
    }
}
