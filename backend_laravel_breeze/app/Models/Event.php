<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'host_id',
        'date',
        'location',
        'description',
        'image',
        'is_approved',
    ];

    public function attendees()
    {
        return $this->belongsToMany(User::class, 'event_user');
    }
}
