<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'first_name' => 'Super',
            'last_name' => 'Admin',
            'email' => 'superadmin@email.com',
            'password' => 'superadmin123',
            'role_id' => 1,
        ]);

        User::create([
            'first_name' => 'Warehouse',
            'last_name' => 'Staff',
            'email' => 'warehouse@email.com',
            'password' => 'warehouse123',
            'role_id' => 2,
        ]);

        User::factory(10)->create();
    }
}
