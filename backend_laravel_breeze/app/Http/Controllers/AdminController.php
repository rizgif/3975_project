<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Event;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        $pendingUsers = User::where('is_approved', false)->get();
        return view('admin.users', ['pendingUsers' => $pendingUsers]);
    }

    public function events()
    {
        $pendingEvents = Event::where('is_approved', false)->get();
        return view('admin.events', ['pendingEvents' => $pendingEvents]);
    }

    public function approveEvent(Event $event)
    {
        $event->is_approved = true; // Corrected the attribute name
        $event->save();
        return redirect()->route('admin.events')->with('success', 'Event approved successfully.');
    }



    public function approve(User $user)
    {
        $user->is_approved = true; // Corrected the attribute name
        $user->save();
        return redirect()->route('admin.users')->with('success', 'User approved successfully.');
    }

    public function reject(User $user)
    {
        $user->delete();
        return redirect()->route('admin.users')->with('success', 'User rejected successfully.');
    }
}
