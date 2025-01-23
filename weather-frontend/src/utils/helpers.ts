export function formatDateWithOrdinal(dateString: string): string {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" }); // Full month name
    const year = date.getFullYear();

    const ordinal = getOrdinalSuffix(day); // Add the ordinal suffix

    return `${day}${ordinal} ${month} ${year}`;
}

function getOrdinalSuffix(day: number): string {
    if (day > 3 && day < 21) return "th"; // Special case for 11th–19th
    switch (day % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}
