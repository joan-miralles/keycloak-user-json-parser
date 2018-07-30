"use strict";

function normalizedFormat(number) {
    return number < 10 ? '0' + number : '' + number;
}

let DateUtils = {
// date array
    getDateArray: function (start, end) {
        var arr = [],
            dt = new Date(start);

        while (dt <= end) {
            arr.push(new Date(dt));
            dt.setDate(dt.getDate() + 1);
        }
        return arr;
    },
    getFormattedDate: function (date) {
        return date.getFullYear() + '-' + normalizedFormat(date.getMonth() + 1) + '-' + normalizedFormat(date.getDate());
    }
};


module.exports = DateUtils;