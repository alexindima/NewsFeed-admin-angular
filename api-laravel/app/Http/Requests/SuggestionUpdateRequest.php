<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SuggestionUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'news' => ['integer'],
        ];
    }

    public function messages()
    {
        return [
            'news.integer' => 'You must use integer for the news',
        ];
    }
}
