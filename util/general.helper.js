function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function checkDatewithinMinutesOfOtherDate(date1, date2, minutes) {
    const MINUTE = 60 * 1000;
    const rangeStart = date1.getTime();
    const rangeEnd = date1.getTime() + MINUTE*minutes; 
    return date2.getTime() >= rangeStart && date2.getTime() <= rangeEnd;
}

module.exports = { addDays, checkDatewithinMinutesOfOtherDate }