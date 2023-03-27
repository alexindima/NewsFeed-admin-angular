<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class StringArray implements ValidationRule
{
    public function message()
    {
        return ':attribute can be only strings.';
    }

    public function validate($attribute, $value, $fail): void
    {
        if (!collect($value)->every(fn ($element) => is_string($element))) {
            $fail(":attribute can be only strings.");
        }
    }
}
