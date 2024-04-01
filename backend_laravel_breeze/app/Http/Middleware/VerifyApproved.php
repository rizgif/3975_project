<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VerifyApproved
{
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user() || !$request->user()->is_approved) {
            return redirect()->route('not-approved');
        }

        return $next($request);
    }
}