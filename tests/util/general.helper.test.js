const generalHelper = require("../../util/general.helper");

describe('check date within 5 minutes of other date', () => {
    test('should return true', () => {
        const date1 = new Date(Date.parse('01 Jan 1970 00:00:00 GMT'));
        const date2 = new Date(Date.parse('01 Jan 1970 00:04:00 GMT'));
        const result = generalHelper.checkDatewithinMinutesOfOtherDate(date1, date2, 5);
        expect(result).toBeTruthy();
    }),

    test('should return true', () => {
        const date1 = new Date(Date.parse('01 Jan 1970 00:00:00 GMT'));
        const date2 = new Date(Date.parse('01 Jan 1970 00:05:00 GMT'));
        const result = generalHelper.checkDatewithinMinutesOfOtherDate(date1, date2, 5);
        expect(result).toBeTruthy();
    })

    test('should return false', () => {
        const date1 = new Date(Date.parse('01 Jan 1970 00:00:00 GMT'));
        const date2 = new Date(Date.parse('01 Jan 1970 00:06:00 GMT'));
        const result = generalHelper.checkDatewithinMinutesOfOtherDate(date1, date2, 5);
        expect(result).toBeFalsy();
    })

})