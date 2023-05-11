<?php

declare(strict_types=1);

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Throwable;
use \Illuminate\Http\JsonResponse;

// стоит добавить какую то обработку случаев когда всё падает, чтобы юзеру просто приходило норм сообщение, а не страшные логи
// вроде как можно заюзать метод render($request, $exception) и даже отталкиваться от типа исключения который тебе пришел
// и отправить юзеру соответствующий запрос
class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function render($request, Throwable $e)
    {
        if ($e instanceof ValidationException) {
            return $this->processValidation($e);
        }

        if ($e instanceof UnauthorizedHttpException || $e instanceof AuthenticationException) {
            return $this->process401($e);
        }

        if ($e instanceof AuthorizationException) {
            return $this->processForbidden($e);
        }

        if ($e instanceof ModelNotFoundException || $e instanceof NotFoundHttpException) {
            return $this->processNotFound($e);
        }

        if ($e instanceof MethodNotAllowedHttpException) {
            return $this->processMethodNotAllowed($e);
        }

        dd($e);
    }

    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    private function processNotFound(Throwable $e): JsonResponse
    {
        return response()->json(['Not found'], 404);
    }

    private function processForbidden(Throwable $e): JsonResponse
    {
        return response()->json(['You are not allowed to perform this action'], 403);
    }

    private function process401(Throwable $e): JsonResponse
    {
        return response()->json(['Not authorized'], 401);
    }

    private function processValidation(ValidationException $exception): JsonResponse
    {
        return response()->json(
            $exception->validator->errors()->messages()
        , 400);
    }

    private function processMethodNotAllowed(MethodNotAllowedHttpException $e): JsonResponse
    {
        return response()->json(['Method not allowed'], 405);
    }
}
