'use client'

import { useState } from "react";
import {useTemperatureUnit} from "@/context/TemperatureUnitContext";
import {fetchWeather} from "@/utils/api";
import Header from "@/components/Header";
import SearchBox from "@/components/SearchBox";
import CurrentWeather from "@/components/CurrentWeather";
import AdditionalInfo from "@/components/AdditionalInfo";
import Forecast from "@/components/Forecast";


const Home = () => {
    const [weatherData, setWeatherData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const { unit } = useTemperatureUnit();

    const handleSearch = async (city: string) => {
        try {
            setError(null);
            const data = await fetchWeather(city);
            setWeatherData(data);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <Header />

            {/* Search Box */}
            <div className="p-4">
                <SearchBox onSearch={handleSearch} />
            </div>

            {/* Grid Layout for Weather Content */}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {weatherData && (
                <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* Current Weather (Spanning two columns on large screens) */}
                    <div className="lg:col-span-2">
                        <CurrentWeather data={weatherData.current} />
                    </div>

                    {/* Additional Info */}
                    <div>
                        <AdditionalInfo data={weatherData.current} />
                    </div>

                    {/* Forecast (Spanning all three columns) */}
                    <div className="lg:col-span-3">
                        <Forecast forecast={weatherData.forecast} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
