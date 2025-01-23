interface CurrentWeatherProps {
    data: {
        name: string;
        sys: { country: string };
        weather: { description: string; icon: string }[];
        main: { temp: number };
    };
}

const CurrentWeather = ({ data }: CurrentWeatherProps) => {
    const { name, sys, weather, main } = data;

    return (
        <div className="p-4 bg-white rounded shadow text-center">
            <h2 className="text-lg font-bold">
                {name}, {sys.country}
            </h2>
            <img
                src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                alt={weather[0].description}
                className="mx-auto"
            />
            <p className="text-3xl font-bold">{main.temp}°</p>
            <p className="capitalize">{weather[0].description}</p>
        </div>
    );
};

export default CurrentWeather;
