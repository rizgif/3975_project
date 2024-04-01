<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\Event;
use App\Models\User;

class EventUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $users = User::all();
        $events = Event::all();

        foreach ($events as $event) {
            $event->attendees()->attach(
                $users->random(rand(1, $users->count()))->pluck('id')->toArray()
            );
        }
    }
}
