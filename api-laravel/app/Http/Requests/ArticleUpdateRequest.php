<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Rules\StringArray;
use Illuminate\Foundation\Http\FormRequest;

class ArticleUpdateRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'mainTitle' => ['string'],
            'secondTitle' => ['string'],
            'photoPass' => ['string'],
            'photoText' => ['string'],
            'body' => ['string'],
            'category' => ['string'],
            'tags' => [
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
            'category.string' => 'You must use string for the category',
        ];
    }
}
