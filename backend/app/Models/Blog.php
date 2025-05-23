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
        'tags',
        'blog_category_id',
    ];

    protected $casts = [
        'content' => 'array',
        'tags' => 'array',
        'date' => 'date',
    ];
    public function category()
    {
        return $this->belongsTo(BlogCategory::class, 'blog_category_id');
    }
}
