<?php

namespace App\Helpers;

use DateTimeInterface;
use Illuminate\Support\Carbon;

class DateFormat
{
    public static function normalize(DateTimeInterface|string|null $value): ?string
    {
        if ($value === null || $value === '') {
            return null;
        }

        $dt = $value instanceof DateTimeInterface ? Carbon::instance($value) : Carbon::parse($value);

        return $dt->format('m-d-Y h:i A');
    }
}

