<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class GeocodeService
{
    protected $apiKey;
    protected $baseUrl = 'https://api.openweathermap.org/geo/1.0';

    public function __construct()
    {
        $this->apiKey = config('services.openweather.key');
    }

    public function getCoordinates(string $city): ?array
    {
        $cacheKey = "geocode_" . md5($city);

        return Cache::remember($cacheKey, 86400, function () use ($city) {
            $response = Http::get("{$this->baseUrl}/direct", [
                'q' => $city,
                'limit' => 1,
                'appid' => $this->apiKey
            ]);

            if ($response->failed()) {
                throw new \Exception('Failed to fetch coordinates');
            }

            $data = $response->json();

            if (empty($data)) {
                return null;
            }

            return [
                'lat' => $data[0]['lat'],
                'lon' => $data[0]['lon']
            ];
        });
    }

    public function searchCities(string $query): array
    {
        $cacheKey = "city_search_" . md5($query);

        return Cache::remember($cacheKey, 3600, function () use ($query) {
            $response = Http::get("{$this->baseUrl}/direct", [
                'q' => $query,
                'limit' => 5,
                'appid' => $this->apiKey
            ]);

            if ($response->failed()) {
                throw new \Exception('Failed to search cities');
            }

            return $response->json();
        });
    }
}
