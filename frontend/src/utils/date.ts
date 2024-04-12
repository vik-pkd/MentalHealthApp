// returns date of midnight on same date
export const setMidNight = (date: Date | string) => {
    const dateObj = new Date(date);
    dateObj.setHours(0);
    dateObj.setMinutes(0);
    dateObj.setSeconds(0);
    dateObj.setMilliseconds(0);
    return dateObj;
};