<?php

namespace App\Http\Requests;

use App\Rules\StringArray;
use Illuminate\Foundation\Http\FormRequest;

class SuggestionStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'news' => ['integer', 'required'],
        ];
    }

    public function messages()
    {
        return [
            'news.required' => 'Please enter a value for the news',
            'news.integer' => 'You must use integer for the news',
        ];
    }
}
