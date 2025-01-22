<?php

use App\Http\Controllers\WeatherController;
use Illuminate\Support\Facades\Route;

Route::get('/weather', [WeatherController::class, 'getWeatherByCity']);

Route::get('/test', function () {
    return response()->json(['message' => 'API route is working']);
});
