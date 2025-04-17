<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = [
        'title',
        'excerpt',
        'content',
        'image',
        'date',
        'author',
        'read_time',
        'tags',
    ];

    protected $casts = [
        'content' => 'array',
        'tags' => 'array',
        'date' => 'date',
    ];
}
