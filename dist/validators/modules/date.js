"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function date(raw) {
    var cleaned = raw.replace(/\D/g, '');
    var day = parseInt(cleaned.substring(0, 2));
    var month = parseInt(cleaned.substring(2, 4));
    var year = parseInt(cleaned.substring(4));
    var d30 = [4, 6, 9, 11];
    if (day > 30 && d30.includes(month)) {
        return false;
    }
    if (month === 2) {
        if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) {
            if (day > 29) {
                return false;
            }
        }
        else if (day > 28) {
            return falses;
        }
    }
    return !(cleaned.length < 5 || month > 12 || day > 31 || day < 1);
}
exports.default = date;
