<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Raw Materials',          'prefix' => 'RAW'],
            ['name' => 'Ingredients',            'prefix' => 'ING'],
            ['name' => 'Packaging',              'prefix' => 'PKG'],
            ['name' => 'Finished Goods',         'prefix' => 'FGD'],
            ['name' => 'Work In Progress',       'prefix' => 'WIP'],
            ['name' => 'Consumables',            'prefix' => 'CON'],
            ['name' => 'Cleaning & Sanitation',  'prefix' => 'CLN'],
            ['name' => 'Maintenance & Repairs',  'prefix' => 'MNT'],
            ['name' => 'Office Supplies',        'prefix' => 'OFF'],
            ['name' => 'Other',                  'prefix' => 'OTH'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
