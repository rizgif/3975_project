<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Admin',
            'email' => 'aa@aa.aa',
            'email_verified_at' => now(),
            'password' => Hash::make('P@$$w0rd'), // Hash the password
            'is_approved' => true, // Assuming you want the admin to be approved automatically
            'created_at' => now(),
            'updated_at' => now(),
            'role' => 'admin'
        ]);
    }
}
