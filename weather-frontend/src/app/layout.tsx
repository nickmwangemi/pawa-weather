import "@/app/globals.css";

import {TemperatureUnitProvider} from "@/context/TemperatureUnitContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <TemperatureUnitProvider>{children}</TemperatureUnitProvider>
        </body>
        </html>
    );
}
