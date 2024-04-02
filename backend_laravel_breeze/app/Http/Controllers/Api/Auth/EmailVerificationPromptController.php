<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification status for API.
     */
    public function __invoke(Request $request): JsonResponse
    {
        return $request->user()->hasVerifiedEmail()
            ? response()->json(['message' => 'Email already verified.'])
            : response()->json(['message' => 'Email is not verified.', 'status' => 'verification-required'], 200);
    }
}
