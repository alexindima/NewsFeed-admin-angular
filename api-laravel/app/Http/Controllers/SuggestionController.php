<?php

namespace App\Http\Controllers;

use App\Models\Suggestion;

class SuggestionController extends BaseController {
    public function __construct()
    {
        parent::__construct(Suggestion::class);
    }
}
