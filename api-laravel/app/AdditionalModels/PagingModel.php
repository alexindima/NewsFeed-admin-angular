<?php

declare(strict_types=1);

namespace App\AdditionalModels;

class PagingModel
{
    public function __construct(
        public mixed $data,
        public int $total,
    ){
    }

}
