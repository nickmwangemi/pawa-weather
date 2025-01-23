const BASE_URL = "http://localhost:8000/api"; // Replace with your Laravel backend URL

export async function fetchWeather(city: string) {
    const response = await fetch(`${BASE_URL}/weather/?city=${city}`);
    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }
    return response.json();
}

export async function toggleTemperatureUnit(unit: "metric" | "imperial") {
    const response = await fetch(`${BASE_URL}/weather/toggle-units`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ unit }),
    });
    if (!response.ok) {
        throw new Error("Failed to toggle temperature unit");
    }
    return response.json();
}
