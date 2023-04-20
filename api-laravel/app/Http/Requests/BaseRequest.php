<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Rules\StringArray;
use Illuminate\Foundation\Http\FormRequest;

abstract class BaseRequest extends FormRequest
{
    // также добавить что то вроде метода body(), который бы ты мог юзать в контроллере и получать сразу готовую модельку
    // то есть делать маппинг именно здесь, а не в контроллерах, как у тебя это сейчас происходит
    public function authorize(): bool
    {
        return true;
    }
}
