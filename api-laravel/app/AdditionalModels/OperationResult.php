<?php

declare(strict_types=1);

namespace App\AdditionalModels;

class OperationResult
{
    private function __construct(
        public mixed $data,
        public bool $success,
        public ?string $message = null,
    ){
    }

    public static function success(mixed $data, string $message = null): self
    {
        return new self($data, true, $message);
    }

    public static function fail(mixed $message): self
    {
        return new self(null, false, $message);
    }
}
