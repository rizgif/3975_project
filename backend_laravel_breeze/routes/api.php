<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Event endpoints
// Create an event
Route::post('/events', [EventController::class, 'store']);

// Get all events -> works
Route::get('/events', [EventController::class, 'index']);

// Get a single event -> works
Route::get('/events/{id}', [EventController::class, 'show']);

// Update an event
Route::put('/events/{id}', [EventController::class, 'update']);
Route::patch('/events/{id}', [EventController::class, 'update']);

// Delete an event
Route::delete('/events/{id}', [EventController::class, 'destroy']);

// Attendee endpoints
// Add an attendee to an event
Route::post('/events/{eventId}/attendees', [EventController::class, 'addAttendee']);

// Get all attendees for an event -> works
Route::get('/events/{eventId}/attendees', [EventController::class, 'getAttendees']);

// Remove an attendee from an event
Route::delete('/events/{eventId}/attendees/{userId}', [EventController::class, 'removeAttendee']);
