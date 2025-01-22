<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    private $baseUrl = 'https://api.openweathermap.org/data/2.5';
    private $geoUrl = 'https://api.openweathermap.org/geo/1.0';

    private $apiKey;

    public function __construct()
    {
        $this->apiKey = env('OPENWEATHER_API_KEY');
    }

    public function getWeatherByCity(Request $request)
    {
        $city = $request->query('city');

        if (!$city) {
            return response()->json(['error' => 'City parameter is required'], 400);
        }

        // First get coordinates using Geocoding API
        $geoResponse = Http::get("{$this->geoUrl}/direct", [
            'q' => $city,
            'limit' => 1,
            'appid' => $this->apiKey
        ]);

        if ($geoResponse->failed() || empty($geoResponse->json())) {
            return response()->json(['error' => 'City not found'], 404);
        }

        $location = $geoResponse->json()[0];
        $lat = $location['lat'];
        $lon = $location['lon'];

        // Get current weather
        $currentWeather = Http::get("{$this->baseUrl}/weather", [
            'lat' => $lat,
            'lon' => $lon,
            'appid' => $this->apiKey,
            'units' => 'metric'
        ]);

        return response()->json($currentWeather->json());
    }
}
