interface AdditionalInfoProps {
    data: {
        wind: { speed: number };
        main: { humidity: number };
    };
}

const AdditionalInfo = ({ data }: AdditionalInfoProps) => {
    const { wind, main } = data;

    return (
        <div className="p-4 bg-white rounded shadow grid grid-cols-2 gap-4 text-center">
            <div>
                <h3 className="font-bold">Wind Speed</h3>
                <p>{wind.speed} m/s</p>
            </div>
            <div>
                <h3 className="font-bold">Humidity</h3>
                <p>{main.humidity}%</p>
            </div>
        </div>
    );
};

export default AdditionalInfo;
