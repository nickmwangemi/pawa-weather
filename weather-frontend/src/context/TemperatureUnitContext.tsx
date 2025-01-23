'use client'

import { createContext, useContext, useState, ReactNode } from "react";

interface TemperatureUnitContextType {
    unit: "metric" | "imperial";
    toggleUnit: () => void;
}

const TemperatureUnitContext = createContext<TemperatureUnitContextType | undefined>(undefined);

export const TemperatureUnitProvider = ({ children }: { children: ReactNode }) => {
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");

    const toggleUnit = () => {
        setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
    };

    return (
        <TemperatureUnitContext.Provider value={{ unit, toggleUnit }}>
            {children}
        </TemperatureUnitContext.Provider>
    );
};

export const useTemperatureUnit = () => {
    const context = useContext(TemperatureUnitContext);
    if (!context) {
        throw new Error("useTemperatureUnit must be used within TemperatureUnitProvider");
    }
    return context;
};
