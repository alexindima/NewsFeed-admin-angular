<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Rules\StringArray;
use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'role' => ['string'],
            'name' => ['string'],
            'email' => ['string'],
            'password' => ['nullable', 'string'],
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
            'role.string' => 'You must use string for the role',
            'name.string' => 'You must use string for the name',
            'email.string' => 'You must use string for the email',
            'password.string' => 'You must use string for the password',
        ];
    }
}
