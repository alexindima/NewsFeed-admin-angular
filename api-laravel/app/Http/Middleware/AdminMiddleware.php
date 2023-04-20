<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Cookie\Middleware\EncryptCookies as Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware extends Middleware
{
    public function handle($request, Closure $next)
    {
        if ($request->user() && $request->user()->hasRole('admin')) {
            return $next($request);
        }
        return response()->json(['error' => 'Forbidden'], Response::HTTP_FORBIDDEN);
    }
}
