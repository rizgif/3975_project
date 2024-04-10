<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;

use App\Http\Controllers\Api\Auth\RegisteredUserController;
use App\Http\Controllers\Api\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Api\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Api\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Api\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Api\Auth\VerifyEmailController;
use App\Http\Controllers\Api\Auth\NewPasswordController;
use App\Http\Controllers\Api\Auth\PasswordController;
use App\Http\Controllers\Api\Auth\PasswordResetLinkController;

Route::middleware('guest')->group(function () {

    Route::post('/register', [RegisteredUserController::class, 'store']);

    Route::post('/login', [AuthenticatedSessionController::class, 'store']);

    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
                ->name('password.email');

    Route::post('/reset-password', [NewPasswordController::class, 'store'])
                ->name('password.store');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/verify-email', EmailVerificationPromptController::class)
                ->name('verification.notice');

    Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
                ->middleware(['signed', 'throttle:6,1'])
                ->name('verification.verify');

    Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware('throttle:6,1')
                ->name('verification.send');

    Route::post('/confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('/password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
                ->name('logout');
});

Route::middleware('auth:sanctum')->group(function () {
    // Create an event
    Route::post('/events', [EventController::class, 'store']);

    // Get all events
    Route::get('/events', [EventController::class, 'index']);

    // Get a single event
    Route::get('/events/{id}', [EventController::class, 'show']);

    // Update an event
    Route::put('/events/{id}', [EventController::class, 'update']);
    Route::patch('/events/{id}', [EventController::class, 'update']);

    // Delete an event
    Route::delete('/events/{id}', [EventController::class, 'destroy']);

    // Add an attendee to an event
    Route::post('/events/{eventId}/attendees', [EventController::class, 'addAttendee']);

    // Get all attendees for an event
    Route::get('/events/{eventId}/attendees', [EventController::class, 'getAttendees']);

    // Remove an attendee from an event
    Route::delete('/events/{eventId}/attendees/{userId}', [EventController::class, 'removeAttendee']);

});

Route::middleware('auth:sanctum')->group(function () {

  Route::get('/users/{userId}/events', [UserController::class, 'getUserEvents']);

});

// To be removed
// Event endpoints
// Create an event
// Route::post('/events', [EventController::class, 'store']);

// // Get all events -> works
// Route::get('/events', [EventController::class, 'index']);

// // Get a single event -> works
// Route::get('/events/{id}', [EventController::class, 'show']);

// // Update an event
// Route::put('/events/{id}', [EventController::class, 'update']);
// Route::patch('/events/{id}', [EventController::class, 'update']);

// // Delete an event
// Route::delete('/events/{id}', [EventController::class, 'destroy']);

// // Attendee endpoints
// // Add an attendee to an event
// Route::post('/events/{eventId}/attendees', [EventController::class, 'addAttendee']);

// // Get all attendees for an event -> works
// Route::get('/events/{eventId}/attendees', [EventController::class, 'getAttendees']);

// // Remove an attendee from an event
// Route::delete('/events/{eventId}/attendees/{userId}', [EventController::class, 'removeAttendee']);

// Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
// Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
// Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
