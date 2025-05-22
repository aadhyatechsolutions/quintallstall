<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpecialOffer extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'second_title',
        'short_description',
        'image',
        'shop_button_text',
    ];
}
