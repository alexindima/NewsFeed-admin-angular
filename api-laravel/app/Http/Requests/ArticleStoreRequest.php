<?php

namespace App\Http\Requests;

use App\Rules\StringArray;
use Illuminate\Foundation\Http\FormRequest;

class ArticleStoreRequest extends FormRequest
{
    // неплохо бы сделать для всех реквестов общий абстрактный класс
    // где можно вынести этот метод, чтобы не писать его каждый раз
    // также добавить что то вроде метода body(), который бы ты мог юзать в контроллере и получать сразу готовую модельку
    // то есть делать маппинг именно здесь, а не в контроллерах, как у тебя это сейчас происходит
    public function authorize(): bool
    {
        return true;
    }

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
