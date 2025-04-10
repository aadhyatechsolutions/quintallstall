<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApmcController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;

use App\Http\Controllers\TestController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('auth/register', [AuthController::class, 'register']);
Route::post('auth/login', [AuthController::class, 'login']);
Route::post('auth/otpLogin', [AuthController::class, 'otpLogin']);
Route::post('auth/generateLoginOtp', [AuthController::class, 'generateLoginOtp']);

Route::post('auth/generateOtp', [AuthController::class, 'generateOtp']);
Route::post('auth/verifyOtp', [AuthController::class, 'verifyOtp']);
Route::middleware(['auth:api'])->get('auth/profile', [AuthController::class, 'profile']);

Route::resource('apmcs', ApmcController::class);
Route::resource('roles', RoleController::class);
Route::resource('users', UserController::class);
Route::resource('products', ProductController::class);
Route::get('products/role/{slug}', [ProductController::class, 'getProductsByRoleSlug']);
Route::put('/products/{id}/status', [ProductController::class, 'updateStatus']);
Route::resource('categories', CategoryController::class);

Route::get('test', [TestController::class,'test']);
