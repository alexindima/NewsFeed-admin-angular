<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TagUpdateRequest extends BaseRequest
{
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
