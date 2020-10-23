"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function phone(raw) {
    var cleaned = ('' + raw).replace(/\D/g, '');
    var match = [];
    if (cleaned.length <= 10) {
        match = cleaned.match(/^(\d{1,2})?[- ]?(\d{1,4})?(\d{1,4})?(.*)?$/);
    }
    else {
        match = cleaned.match(/^(\d{1,2})?[- ]?(\d{1,5})?(\d{1,4})?(.*)?$/);
    }
    for (var i = 1; i <= 3; i++) {
        if (!match[i]) {
            match[i] = '';
        }
    }
    if (!match[1] || cleaned.length < 2) {
        return raw;
    }
    else if (match[1] && !match[2]) {
        return "(" + match[1] + ") ";
    }
    else if (match[2] && !match[3]) {
        return "(" + match[1] + ") " + match[2] + (cleaned.length < 6 ? '' : '-');
    }
    else if (match[3]) {
        return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
}
exports.default = phone;
