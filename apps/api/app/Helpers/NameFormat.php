<?php

namespace App\Helpers;

class NameFormat
{
    public static function fullName(?string $firstName, ?string $middleName, ?string $lastName): string
    {
        $firstName = trim((string) $firstName);
        $middleName = trim((string) $middleName);
        $lastName = trim((string) $lastName);

        $middleInitial = $middleName !== ''
            ? strtoupper(mb_substr($middleName, 0, 1)).'.'
            : null;

        return trim(implode(' ', array_filter([
            $firstName !== '' ? $firstName : null,
            $middleInitial,
            $lastName !== '' ? $lastName : null,
        ])));
    }
}
