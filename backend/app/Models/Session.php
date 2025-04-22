<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'device',
        'ip_address',
        'browser',
        'last_active_at',
        'token_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class); // Assuming you have a User model
    }
}
