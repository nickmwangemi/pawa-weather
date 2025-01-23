import {formatDateWithOrdinal} from "@/utils/helpers";

interface ForecastProps {
    forecast: Array<{
        date: string;
        temp: number;
        weather: { description: string; icon: string };
    }>;
}

const Forecast = ({ forecast }: ForecastProps) => {
    return (
        <div className="p-4 bg-white rounded shadow grid grid-cols-1 md:grid-cols-3 gap-4">
            {forecast.map((day, index) => (
                <div key={index} className="text-center">
                    <p>{formatDateWithOrdinal(day.date)}</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                        alt={day.weather.description}
                        className="mx-auto"
                    />
                    <p className="text-lg font-bold">{day.temp}°</p>
                    <p className="capitalize">{day.weather.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Forecast;
