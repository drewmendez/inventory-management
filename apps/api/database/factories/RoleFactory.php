<?php

namespace Database\Factories;

use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Role>
 */
class RoleFactory extends Factory
{
    protected $model = Role::class;

    public function definition(): array
    {
        return [
            'name' => fake()->unique()->jobTitle(),
        ];
    }

    public function admin(): static
    {
        return $this->state(fn () => ['name' => 'Admin']);
    }

    public function warehouseStaff(): static
    {
        return $this->state(fn () => ['name' => 'Warehouse Staff']);
    }
}
