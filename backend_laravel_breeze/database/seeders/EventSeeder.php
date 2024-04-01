<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\Event;
use App\Models\User;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 8) as $index) {
            Event::create([
                'title' => $faker->sentence,
                'host_id' => $faker->numberBetween(1, User::count()),
                'date' => $faker->dateTimeBetween('+0 days', '+2 years'),
                'location' => $faker->address,
                'description' => $faker->paragraph,
                'image' => $faker->imageUrl(640, 480, 'events', true),
                'is_approved' => $faker->boolean,
            ]);
        }
    }
}
