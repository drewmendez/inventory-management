<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Item;
use App\Models\Unit;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categoriesByPrefix = Category::query()
            ->pluck('id', 'prefix')
            ->all();

        $unitsBySymbol = Unit::query()
            ->pluck('id', 'symbol')
            ->all();

        $items = [
            // RAW (Raw Materials)
            ['sku' => 'RAW-0001', 'name' => 'Flour',                'quantity' => 0.00, 'reorder_level' => 5.00, 'category' => 'RAW', 'unit' => 'sack'],
            ['sku' => 'RAW-0002', 'name' => 'Rice',                 'quantity' => 0.00, 'reorder_level' => 10.00, 'category' => 'RAW', 'unit' => 'sack'],
            ['sku' => 'RAW-0003', 'name' => 'Sugar',                'quantity' => 0.00,  'reorder_level' => 25.00, 'category' => 'RAW', 'unit' => 'kg'],
            ['sku' => 'RAW-0004', 'name' => 'Salt',                 'quantity' => 0.00,  'reorder_level' => 10.00, 'category' => 'RAW', 'unit' => 'kg'],
            ['sku' => 'RAW-0005', 'name' => 'Cocoa Powder',         'quantity' => 0.00,  'reorder_level' => 5.00,  'category' => 'RAW', 'unit' => 'kg'],
            ['sku' => 'RAW-0006', 'name' => 'Cornstarch',           'quantity' => 0.00,  'reorder_level' => 10.00, 'category' => 'RAW', 'unit' => 'kg'],
            ['sku' => 'RAW-0007', 'name' => 'Powdered Milk',        'quantity' => 0.00,  'reorder_level' => 10.00, 'category' => 'RAW', 'unit' => 'kg'],

            // ING (Ingredients)
            ['sku' => 'ING-0001', 'name' => 'Baking Powder',        'quantity' => 0.00,   'reorder_level' => 2.00,   'category' => 'ING', 'unit' => 'kg'],
            ['sku' => 'ING-0002', 'name' => 'Yeast',                'quantity' => 0.00,   'reorder_level' => 1.00,   'category' => 'ING', 'unit' => 'kg'],
            ['sku' => 'ING-0003', 'name' => 'Vanilla Extract',      'quantity' => 0.00,   'reorder_level' => 2.00,   'category' => 'ING', 'unit' => 'L'],
            ['sku' => 'ING-0004', 'name' => 'Soy Sauce',            'quantity' => 0.00,  'reorder_level' => 10.00,  'category' => 'ING', 'unit' => 'L'],
            ['sku' => 'ING-0005', 'name' => 'Vinegar',              'quantity' => 0.00,  'reorder_level' => 10.00,  'category' => 'ING', 'unit' => 'L'],

            // PKG (Packaging)
            ['sku' => 'PKG-0001', 'name' => 'Bottle (500mL)',       'quantity' => 0.00, 'reorder_level' => 200.00, 'category' => 'PKG', 'unit' => 'pc'],
            ['sku' => 'PKG-0002', 'name' => 'Bottle Cap',           'quantity' => 0.00, 'reorder_level' => 200.00, 'category' => 'PKG', 'unit' => 'pc'],
            ['sku' => 'PKG-0003', 'name' => 'Label Sticker',        'quantity' => 0.00, 'reorder_level' => 500.00, 'category' => 'PKG', 'unit' => 'pc'],
            ['sku' => 'PKG-0004', 'name' => 'Corrugated Box',       'quantity' => 0.00, 'reorder_level' => 50.00,  'category' => 'PKG', 'unit' => 'pc'],
            ['sku' => 'PKG-0005', 'name' => 'Ziplock Bag (Medium)', 'quantity' => 0.00,  'reorder_level' => 20.00,  'category' => 'PKG', 'unit' => 'pack'],

            // FGD (Finished Goods)
            ['sku' => 'FGD-0001', 'name' => 'Bottled Product 500mL', 'quantity' => 0.00, 'reorder_level' => 50.00, 'category' => 'FGD', 'unit' => 'pc'],
            ['sku' => 'FGD-0002', 'name' => 'Snack Pack',            'quantity' => 0.00, 'reorder_level' => 50.00, 'category' => 'FGD', 'unit' => 'pack'],
            ['sku' => 'FGD-0003', 'name' => 'Boxed Product',         'quantity' => 0.00, 'reorder_level' => 20.00, 'category' => 'FGD', 'unit' => 'box'],

            // CON (Consumables)
            ['sku' => 'CON-0001', 'name' => 'Disposable Gloves',     'quantity' => 0.00,  'reorder_level' => 5.00,   'category' => 'CON', 'unit' => 'box'],
            ['sku' => 'CON-0002', 'name' => 'Hair Net',              'quantity' => 0.00, 'reorder_level' => 200.00, 'category' => 'CON', 'unit' => 'pc'],

            // CLN (Cleaning & Sanitation)
            ['sku' => 'CLN-0001', 'name' => 'Dishwashing Liquid',    'quantity' => 8.00,  'reorder_level' => 3.00, 'category' => 'CLN', 'unit' => 'L'],
            ['sku' => 'CLN-0002', 'name' => 'Bleach',                'quantity' => 0.00,  'reorder_level' => 3.00, 'category' => 'CLN', 'unit' => 'L'],
        ];

        foreach ($items as $item) {
            $categoryId = $categoriesByPrefix[$item['category']] ?? null;
            $unitId = $unitsBySymbol[$item['unit']] ?? null;

            if (! $categoryId || ! $unitId) {
                continue;
            }

            Item::create([
                'sku' => $item['sku'],
                'name' => $item['name'],
                'quantity' => $item['quantity'],
                'reorder_level' => $item['reorder_level'],
                'category_id' => $categoryId,
                'unit_id' => $unitId,
            ]);
        }
    }
}
