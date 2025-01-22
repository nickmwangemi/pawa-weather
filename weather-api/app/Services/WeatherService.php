<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class WeatherService
{
    protected $apiKey;
    protected $baseUrl = 'https://api.openweathermap.org/data/2.5';

    public function __construct()
    {
        $this->apiKey = config('services.openweather.key');
    }

    public function getCurrentWeather(array $coordinates): array
    {
        $cacheKey = "weather_current_{$coordinates['lat']}_{$coordinates['lon']}";

        return Cache::remember($cacheKey, 1800, function () use ($coordinates) {
            $response = Http::get("{$this->baseUrl}/weather", [
                'lat' => $coordinates['lat'],
                'lon' => $coordinates['lon'],
                'appid' => $this->apiKey,
                'units' => 'metric'
            ]);

            if ($response->failed()) {
                throw new \Exception('Failed to fetch current weather data');
            }

            return $response->json();
        });
    }

    public function getForecast(array $coordinates): array
    {
        $cacheKey = "weather_forecast_{$coordinates['lat']}_{$coordinates['lon']}";

        return Cache::remember($cacheKey, 1800, function () use ($coordinates) {
            $response = Http::get("{$this->baseUrl}/forecast", [
                'lat' => $coordinates['lat'],
                'lon' => $coordinates['lon'],
                'appid' => $this->apiKey,
                'units' => 'metric'
            ]);

            if ($response->failed()) {
                throw new \Exception('Failed to fetch forecast data');
            }

            $data = $response->json();
            return $this->processThreeDayForecast($data['list'] ?? []);
        });
    }

    private function processThreeDayForecast(array $forecastList): array
    {
        $processedForecast = [];
        $currentDate = null;
        $daysCollected = 0;

        foreach ($forecastList as $forecast) {
            $forecastDate = date('Y-m-d', $forecast['dt']);

            if ($currentDate !== $forecastDate && $daysCollected < 3) {
                $currentDate = $forecastDate;
                $daysCollected++;

                $processedForecast[] = [
                    'date' => $forecastDate,
                    'temp' => $forecast['main']['temp'],
                    'weather' => $forecast['weather'][0],
                    'humidity' => $forecast['main']['humidity'],
                    'wind_speed' => $forecast['wind']['speed']
                ];
            }
        }

        return $processedForecast;
    }
}
