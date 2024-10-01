export const getDatesInRange = (startDate: string | Date, endDate: string | Date): number[] => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const dateInMilliseconds = new Date(start.getTime());
    const dates: number[] = []; // Explicitly type the array

    while (dateInMilliseconds <= end) {
        dates.push(dateInMilliseconds.getTime());
        dateInMilliseconds.setDate(dateInMilliseconds.getDate() + 1);
    }

    return dates;
};
