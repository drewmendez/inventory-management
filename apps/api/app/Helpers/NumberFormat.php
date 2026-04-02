<?php

namespace App\Helpers;

class NumberFormat
{
    public static function trimTrailingZeros(string|int|float $value, int $scale = 2): int|float
    {
        $str = number_format((float) $value, $scale, '.', '');
        $str = rtrim(rtrim($str, '0'), '.');

        if ($str === '' || $str === '-') {
            return 0;
        }

        return str_contains($str, '.') ? (float) $str : (int) $str;
    }
}
