"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function date(raw) {
    var cleaned = ('' + raw).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{1,2})?[- ]??[\s]?(\d{1,2})?(.*)?$/);
    for (var i = 1; i <= 3; i++) {
        if (!match[i]) {
            match[i] = '';
        }
    }
    if (!match[1] || cleaned.length < 2) {
        return raw;
    }
    else if (match[1] && !match[2]) {
        return match[1] + "/";
    }
    else if (match[2] && !match[3]) {
        return match[1] + "/" + match[2] + (cleaned.length < 4 ? '' : '/');
    }
    else if (match[3]) {
        return match[1] + "/" + match[2] + "/" + match[3];
    }
}
exports.default = date;
