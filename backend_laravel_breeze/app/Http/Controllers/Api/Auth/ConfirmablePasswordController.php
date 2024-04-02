<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConfirmablePasswordController extends Controller
{
    /**
     * Confirm the user's password for API.
     */
    public function store(Request $request)
    {
        if (! Auth::guard('web')->validate([
            'email' => $request->user()->email,
            'password' => $request->password,
        ])) {
            return response()->json(['error' => __('auth.password')], 401); // Unauthorized
        }

        // For APIs, you might want to return a success response instead of redirecting
        return response()->json(['message' => 'Password confirmed successfully.'], 200);
    }
}
