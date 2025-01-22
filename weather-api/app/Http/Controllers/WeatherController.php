<?php

namespace App\Http\Controllers;

use App\Services\WeatherService;
use App\Services\GeocodeService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class WeatherController extends Controller
{
    protected $weatherService;
    protected $geocodeService;

    public function __construct(WeatherService $weatherService, GeocodeService $geocodeService)
    {
        $this->weatherService = $weatherService;
        $this->geocodeService = $geocodeService;
    }

    public function getWeather(Request $request): JsonResponse
    {
        $request->validate([
            'city' => 'required|string|max:255',
        ]);

        try {
            $coordinates = $this->geocodeService->getCoordinates($request->city);

            if (!$coordinates) {
                return response()->json(['error' => 'City not found'], 404);
            }

            $currentWeather = $this->weatherService->getCurrentWeather($coordinates);
            $forecast = $this->weatherService->getForecast($coordinates);

            return response()->json([
                'current' => $currentWeather,
                'forecast' => $forecast,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
