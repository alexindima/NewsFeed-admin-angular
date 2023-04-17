<?php

namespace App\Http\Requests;

use App\Rules\StringArray;
use Illuminate\Foundation\Http\FormRequest;

class ArticleUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'main_title' => ['string'],
            'second_title' => ['string'],
            'photo_pass' => ['string'],
            'photo_text' => ['string'],
            'body' => ['string'],
            'category_id' => ['int'],
            'tag_ids' => [
                'array',
                new StringArray(),
            ],
        ];
    }

    public function messages()
    {
        return [
            'main_title.string' => 'You must use string for the main title',
            'second_title.string' => 'You must use string for the second title',
            'photo_pass.string' => 'You must use string for the photo URL',
            'photo_text.string' => 'You must use string for the photo text',
            'body.string' => 'You must use string for the body',
            'category_id.string' => 'You must use string for the category',
        ];
    }
}
