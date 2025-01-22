<?php

use App\Http\Controllers\WeatherController;
use App\Http\Controllers\GeocodeController;
use Illuminate\Support\Facades\Route;

Route::get('/weather', [WeatherController::class, 'getWeather']);
Route::get('/geocode', [GeocodeController::class, 'searchCity']);
