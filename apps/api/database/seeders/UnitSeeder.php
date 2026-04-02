<?php

namespace Database\Seeders;

use App\Models\Unit;
use Illuminate\Database\Seeder;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $units = [
            ['name' => 'Piece',    'symbol' => 'pc'],
            ['name' => 'Sack',     'symbol' => 'sack'],
            ['name' => 'Box',      'symbol' => 'box'],
            ['name' => 'Pack',     'symbol' => 'pack'],
            ['name' => 'Kilogram', 'symbol' => 'kg'],
            ['name' => 'Gram',     'symbol' => 'g'],
            ['name' => 'Liter',    'symbol' => 'L'],
        ];

        foreach ($units as $unit) {
            Unit::create($unit);
        }
    }
}
