<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable {
    use HasFactory, SoftDeletes, HasApiTokens;

    protected $table = 'users';
    protected $primaryKey = 'id';

    /*protected $hidden = [
        'password'
    ];*/

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $visible = [
        'id',
        'name',
        'email',
        'password',
        'role'
    ];

    public function hasRole($role)
    {
        // Check if user has the given role
        return $this->role === $role;
    }

    public function getRoleAttribute()
    {
        // Logic to determine user's role, e.g. fetching from a database column
        // Replace this with your own logic to get the user's role
        // For example, if your role information is stored in a 'role' column in the users table
        // you can return $this->attributes['role'] assuming that your user model has a 'role' column
        return $this->attributes['role'] ?? null;
    }

    public function tags(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'user_tag', 'user_id', 'id');
    }

    public function categories(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'user_category', 'user_id', 'id');
    }

// use HasApiTokens, HasFactory, Notifiable;
//    /**
//     * The attributes that are mass assignable.
//     *
//     * @var array<int, string>
//     */
//    protected $fillable = [
//        'name',
//        'email',
//        'password',
//    ];
//
//    /**
//     * The attributes that should be hidden for serialization.
//     *
//     * @var array<int, string>
//     */
//    protected $hidden = [
//        'password',
//        'remember_token',
//    ];
//
//    /**
//     * The attributes that should be cast.
//     *
//     * @var array<string, string>
//     */
//    protected $casts = [
//        'email_verified_at' => 'datetime',
//    ];
}
