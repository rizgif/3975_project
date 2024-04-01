<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        $pendingUsers = User::where('is_approved', false)->get();
        return view('admin.users', ['pendingUsers' => $pendingUsers]);
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
