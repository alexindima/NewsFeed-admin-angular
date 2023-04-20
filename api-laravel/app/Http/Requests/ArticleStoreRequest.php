<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Rules\StringArray;
use Illuminate\Foundation\Http\FormRequest;

class ArticleStoreRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            // стоит добавить еще валидацию по кол-ву допустимых символов, который соответствует колонкам в БД, юзай max
            'mainTitle' => ['string', 'required'],
            'secondTitle' => ['string', 'required'],
            'photoPass' => ['string', 'required'],
            'photoText' => ['string', 'required'],
            'body' => ['string', 'required'],
            'category' => ['string', 'required'],
            'tags' => [
                'array',
                new StringArray(),
            ],
        ];
    }

    public function messages()
    {
        return [
            // все такие сообщения желательно выводить в файл ресурсов
            // может пригодиться если подобные сообщения будут юзаться где то еще
            // https://laravel.com/docs/10.x/localization

            'main_title.required' => 'Please enter a value for the main title',
            'main_title.string' => 'You must use string for the main title',
            'second_title.required' => 'Please enter a value for the second title',
            'second_title.string' => 'You must use string for the second title',
            'photo_pass.required' => 'Please enter a value for the photo URL',
            'photo_pass.string' => 'You must use string for the photo URL',
            'photo_text.required' => 'Please enter a value for the photo text',
            'photo_text.string' => 'You must use string for the photo text',
            'body.required' => 'Please enter a value for the body',
            'body.string' => 'You must use string for the body',
            'category.required' => 'Please enter a value for the category',
            'category.string' => 'You must use string for the category',
        ];
    }
}
