<?php

namespace App\Http\Controllers;

use App\Services\GeocodeService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class GeocodeController extends Controller
{
    protected $geocodeService;

    public function __construct(GeocodeService $geocodeService)
    {
        $this->geocodeService = $geocodeService;
    }

    public function searchCity(Request $request): JsonResponse
    {
        $request->validate([
            'query' => 'required|string|max:255',
        ]);

        try {
            $cities = $this->geocodeService->searchCities($request->query);
            return response()->json($cities);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
