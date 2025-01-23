import { useState } from "react";

interface SearchBoxProps {
    onSearch: (city: string) => void;
}

const SearchBox = ({ onSearch }: SearchBoxProps) => {
    const [city, setCity] = useState("");

    const handleSearch = () => {
        if (city.trim() === "") return;
        onSearch(city.trim());
    };

    return (
        <div className="flex gap-2 p-4">
            <input
                type="text"
                placeholder="Search city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 flex-grow"
            />
            <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                GO
            </button>
        </div>
    );
};

export default SearchBox;
