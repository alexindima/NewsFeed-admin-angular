<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Rules\StringArray;
use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'role' => ['string', 'required'],
            'name' => ['string', 'required'],
            'email' => ['string', 'required'],
            'password' => ['string', 'required'],
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
            'role.required' => 'Please enter a value for the role',
            'role.string' => 'You must use string for the role',
            'name.required' => 'Please enter a value for the name',
            'name.string' => 'You must use string for the name',
            'email.required' => 'Please enter a value for the email',
            'email.string' => 'You must use string for the email',
            'password.required' => 'Please enter a value for the password',
            'password.string' => 'You must use string for the password',
        ];
    }
}
