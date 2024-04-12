module.exports.areDatesOnSameDay = (date1, date2) => {
    const dateObj1 = new Date(date1);
    const dateObj2 = new Date(date2);
    return dateObj1.getFullYear() === dateObj2.getFullYear() &&
           dateObj1.getMonth() === dateObj2.getMonth() &&
           dateObj1.getDate() === dateObj2.getDate();
};

module.exports.setMidNight = (date) => {
    const dateObj = new Date(date);
    dateObj.setHours(0);
    dateObj.setMinutes(0);
    dateObj.setSeconds(0);
    dateObj.setMilliseconds(0);
    return dateObj;
};