<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $adminEmail = 'aa@aa.aa';

        // Check if the admin user already exists
        if (!User::where('email', $adminEmail)->exists()) {
            DB::table('users')->insert([
                'name' => 'Admin',
                'email' => $adminEmail,
                'email_verified_at' => now(),
                'password' => Hash::make('P@$$w0rd'),
                'is_approved' => true,
                'created_at' => now(),
                'updated_at' => now(),
                'role' => 'admin',
            ]);
        }

        $faker = Faker::create();

        $numberOfUsers = 10;

        // Insert fake users
        for ($i = 0; $i < $numberOfUsers; $i++) {
            DB::table('users')->insert([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
                'role' => 'user',
            ]);
        }

    }

}
