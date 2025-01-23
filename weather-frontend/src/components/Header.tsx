import {useTemperatureUnit} from "@/context/TemperatureUnitContext";

const Header = () => {
    const { unit, toggleUnit } = useTemperatureUnit();

    const handleToggle = (selectedUnit: "metric" | "imperial") => {
        if (unit !== selectedUnit) {
            toggleUnit();
        }
    };

    return (
        <header className="p-4 bg-blue-600 text-white flex justify-between items-center">
            {/* App Title */}
            <h1 className="text-xl font-bold">Weather App</h1>

            {/* Temperature Unit Toggle Buttons */}
            <div className="flex gap-2">
                <button
                    onClick={() => handleToggle("metric")}
                    className={`px-4 py-2 rounded ${
                        unit === "metric"
                            ? "bg-white text-blue-600 font-bold"
                            : "bg-blue-500 text-white"
                    }`}
                >
                    °C
                </button>
                <button
                    onClick={() => handleToggle("imperial")}
                    className={`px-4 py-2 rounded ${
                        unit === "imperial"
                            ? "bg-white text-blue-600 font-bold"
                            : "bg-blue-500 text-white"
                    }`}
                >
                    °F
                </button>
            </div>
        </header>
    );
};

export default Header;
