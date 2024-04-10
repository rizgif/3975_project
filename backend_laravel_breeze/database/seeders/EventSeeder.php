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

        // foreach (range(1, 8) as $index) {
        //     Event::create([
        //         'title' => $faker->sentence,
        //         'host_id' => $faker->numberBetween(1, User::count()),
        //         'date' => $faker->dateTimeBetween('+0 days', '+2 years'),
        //         'location' => $faker->address,
        //         'description' => $faker->paragraph,
        //         'image' => $faker->imageUrl(640, 480, 'events', true),
        //         'is_approved' => $faker->boolean,
        //     ]);
        // }

        Event::create([
            'title' => 'Vancouver Digital Project Managers',
            'host_id' => 1,
            'date' => $faker->dateTimeBetween('+0 days', '+1 years'),
            'location' => $faker->address,
            'description' => 'Join us for a fast pace evening of 4 Lightning Talks from 4 experienced industry leaders.',
            'image' => 'https://source.unsplash.com/a-group-of-people-standing-around-each-other-7J4T1XzpJgU',
            'is_approved' => true,
        ]);

        Event::create([
            'title' => 'Meditation, Oracle Readings and Conversation',
            'host_id' => 2,
            'date' => $faker->dateTimeBetween('+0 days', '+1 years'),
            'location' => $faker->address,
            'description' => 'Join Farhad as he guides you through meditation and a sound bath experience, using crystal bowls, gongs and chimes. This will be an evening of meditation and sound healing. Melt into the healing sounds of crystal bowls, handpan, symphonic gongs, and chimes.',
            'image' => 'https://source.unsplash.com/two-women-sitting-on-yoga-mats-doing-yoga-exercises-8Y4vJgJQB1k',
            'is_approved' => true,
        ]);

        Event::create([
            'title' => 'Wednesday Night Writing',
            'host_id' => 3,
            'date' => $faker->dateTimeBetween('+0 days', '+1 years'),
            'location' => $faker->address,
            'description' => 'For the first hour of the meetup, we put our heads down and write, and for the second hour is socializing and chat. Bring your laptop, phone or paper notebook to work on your project and have some fun drinking too! We can be found at the big table at the back.',
            'image' => 'https://source.unsplash.com/person-holding-on-red-pen-while-writing-on-book-333oj7zFsdg',
            'is_approved' => true,
        ]);

        Event::create([
            'title' => 'Data Science Reading Group',
            'host_id' => 4,
            'date' => $faker->dateTimeBetween('+0 days', '+1 years'),
            'location' => $faker->address,
            'description' => 'What is the Data Science Reading Group about?: We will meet every other week and present/discuss a topic of interest. The group votes on the topic/paper to read next time. Anyone can propose a paper for the following Meetup.',
            'image' => 'https://source.unsplash.com/black-and-silver-laptop-computer-IrRbSND5EUc',
            'is_approved' => true,
        ]);

        Event::create([
            'title' => 'Langley Board Games at The Raving Gamer',
            'host_id' => 5,
            'date' => $faker->dateTimeBetween('+0 days', '+1 years'),
            'location' => $faker->address,
            'description' => 'Join us for an evening of board game excitement at The Raving Gamer! Langley Board Games is hosting a night where board game enthusiasts of all levels can gather and immerse themselves in an unforgettable gaming experience. With a diverse collection of board games available, something for everyone to enjoy.',
            'image' => 'https://source.unsplash.com/a-man-playing-a-game-of-checkers-with-another-man-uUMP9dXIm-o',
            'is_approved' => true,
        ]);

        Event::create([
            'title' => 'Musicians Play for Musicians',
            'host_id' => 6,
            'date' => $faker->dateTimeBetween('+0 days', '+1 years'),
            'location' => $faker->address,
            'description' => 'Musicians Play for Musicians - A live soul-to-soul music experience designed to inspire creativity, foster musical expression and much needed community in this town. Where musicians play for musicians in a some privacy in the aimed to encourage your full musical expression.',
            'image' => 'https://source.unsplash.com/man-in-black-crew-neck-t-shirt-playing-electric-guitar-o-9-fSSiCT0',
            'is_approved' => true,
        ]);
    }
}


