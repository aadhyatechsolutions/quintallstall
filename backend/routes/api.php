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
use App\Http\Controllers\VehicleTypeController;
use App\Http\Controllers\VehicleCommissionController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\CoinController;
use App\Http\Controllers\ReviewController;

use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\ShippingDetailController;
use App\Http\Controllers\PaymentController;

use App\Http\Controllers\CartController;

use App\Http\Controllers\BlogController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\TaxController;
use App\Http\Controllers\PurchaseCoinController;
use App\Http\Controllers\ContactUsController;

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
Route::post('auth/login', [AuthController::class, 'login'])->name('login');
Route::post('auth/otpLogin', [AuthController::class, 'otpLogin']);
Route::post('auth/generateLoginOtp', [AuthController::class, 'generateLoginOtp']);


Route::post('auth/generateOtp', [AuthController::class, 'generateOtp']);
Route::post('auth/verifyOtp', [AuthController::class, 'verifyOtp']);
Route::post('auth/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('auth/profile', [AuthController::class, 'profile']);

Route::resource('apmcs', ApmcController::class);
Route::resource('roles', RoleController::class);
Route::resource('users', UserController::class);

Route::post('/staff/create', [UserController::class, 'createStaff']);
Route::put('/staff/{id}', [UserController::class, 'updateStaff']);
// Route::resource('products', ProductController::class);
Route::resource('categories', CategoryController::class);
Route::resource('reviews', ReviewController::class);

Route::get('products/role/{slug}', [ProductController::class, 'getProductsByRoleSlug']);
Route::put('/products/{id}/status', [ProductController::class, 'updateStatus']);
Route::get('/vehicle/types', [VehicleController::class, 'getVehicleTypes']);

Route::resource('order-items', OrderItemController::class);
Route::resource('shipping-details', ShippingDetailController::class);
Route::resource('payments', PaymentController::class);
Route::resource('coins', CoinController::class);
Route::resource('blogs', BlogController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/products/seller', [ProductController::class, 'fetchBySeller']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);

    Route::get('wishlists', [WishlistController::class, 'index']);  
    Route::post('wishlists', [WishlistController::class, 'store']); 
    Route::delete('wishlists/{id}', [WishlistController::class, 'destroy']); 
});

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

Route::middleware('auth:sanctum')->controller(CartController::class)->prefix('cart')->group(function () {
    Route::post('/add', 'addToCart');
    Route::get('/', 'viewCart');
    Route::patch('/item/{id}', 'updateCartItem');
    Route::delete('/item/{id}', 'removeCartItem');
    Route::post('/clear', 'clearCart');
});
Route::middleware('auth:sanctum')->controller(OrderController::class)->group(function () {
    Route::post('/place-order', 'placeOrder');
    Route::put('/orders/{id}/update-status', 'updateStatus');
    Route::resource('orders', OrderController::class);

});

Route::middleware('auth:sanctum')->controller(SessionController::class)->group(function () {
    Route::get('/sessions', 'index');
    Route::delete('/sessions/{tokenId}', 'logout');
});

Route::middleware('auth:sanctum')->controller(WalletController::class)->group(function () {
    Route::post('/wallet/add-amount', 'addAmount');
    Route::get('/wallet', 'getWallet');
    Route::put('/wallet', 'update'); 
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/taxes', [TaxController::class, 'index']); 
    Route::post('/tax', [TaxController::class, 'store']);
    Route::put('/tax/{id}', [TaxController::class, 'update']);
    Route::delete('/tax/{id}', [TaxController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/purchase-coins', [PurchaseCoinController::class, 'index']);
    Route::get('/purchased-coins', [PurchaseCoinController::class, 'getAllCoins']);
    Route::post('/purchase-coins', [PurchaseCoinController::class, 'store']);
});
Route::middleware('auth:sanctum')->group(function () {
    Route::resource('vehicle-types', VehicleTypeController::class);
    Route::resource('vehicle-commissions', VehicleCommissionController::class);
});
Route::post('/contact-us', [ContactUsController::class, 'send']);

Route::get('test', [TestController::class,'test']);
