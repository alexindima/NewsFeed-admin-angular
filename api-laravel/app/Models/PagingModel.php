<?php

namespace App\Models;

class PagingModel
{
    public function __construct(
        public mixed $data,
        public int $total,
    )
    {
    }

}
