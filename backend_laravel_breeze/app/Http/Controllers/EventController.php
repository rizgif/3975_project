<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class EventController extends Controller
{
  //create an event
  public function store(Request $request)
  {
    $validatedData = $request->validate([
      'title' => 'required|string',
      'host_id' => 'required|integer|exists:users,id',
      'date' => 'required|date',
      'location' => 'required|string',
      'description' => 'nullable|string',
      'image' => 'nullable|string',
      'is_approved' => 'required|boolean',
    ]);

    $event = Event::create($validatedData);

    return response()->json($event, 201);
  }

  //get all events
  public function index()
  {
    $approvedEvents = Event::where('is_approved', true)->get();
    return response()->json($approvedEvents);
  }

  //get a single event
  public function show($id)
  {
    $event = Event::find($id);

    if (!$event) {
      return response()->json(['message' => 'Event not found'], 404);
    }

    return response()->json($event);
  }

  // update an event
  public function update(Request $request, $id)
  {
    $event = Event::find($id);

    if (!$event) {
      return response()->json(['message' => 'Event not found'], 404);
    }

    $validatedData = $request->validate([
      'title' => 'string',
      'date' => 'date',
      'location' => 'string',
      'description' => 'nullable|string',
      'image' => 'nullable|string',
      'is_approved' => 'boolean',
    ]);

    $event->update($validatedData);

    return response()->json($event);
  }

  // delete an event
  public function destroy($id)
  {
    $event = Event::find($id);

    if (!$event) {
      return response()->json(['message' => 'Event not found'], 404);
    }

    $event->delete();

    return response()->json(['message' => 'Event deleted']);
  }

  public function getAttendees($eventId)
  {
    $event = Event::with('attendees')->find($eventId);

    if (!$event) {
      return response()->json(['message' => 'Event not found'], 404);
    }

    return response()->json($event->attendees);
  }

  // add an attendee to an event
  public function addAttendee(Request $request, $eventId)
  {
    $event = Event::find($eventId);

    if (!$event) {
      return response()->json(['message' => 'Event not found'], 404);
    }

    $userId = $request->validate(['user_id' => 'required|integer|exists:users,id'])['user_id'];

    // Prevent duplicate attendee entries
    if (!$event->attendees()->find($userId)) {
      $event->attendees()->attach($userId);
    }

    return response()->json(['message' => 'Attendee added']);
  }

  // remove an attendee from an event
  public function removeAttendee($eventId, $userId)
  {
    $event = Event::find($eventId);

    if (!$event) {
      return response()->json(['message' => 'Event not found'], 404);
    }

    if ($event->attendees()->find($userId)) {
      $event->attendees()->detach($userId);
      return response()->json(['message' => 'Attendee removed']);
    }

    return response()->json(['message' => 'Attendee not found in this event'], 404);
  }
}
