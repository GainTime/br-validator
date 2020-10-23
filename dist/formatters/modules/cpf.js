"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cpf(raw) {
    var cleaned = ('' + raw).replace(/\D/g, '');
    var regex = /^(\d{1,3})?[- ]??[\s]?(\d{1,3})?[\s]?(\d{1,3})?(.*)?$/;
    var match = cleaned.match(regex);
    for (var i = 1; i <= 4; i++) {
        if (!match[i])
            match[i] = '';
    }
    if (!match[1] || cleaned.length < 3) {
        return raw;
    }
    else if (match[1] && !match[2]) {
        return match[1] + ".";
    }
    else if (match[2] && !match[3]) {
        return match[1] + "." + match[2] + (cleaned.length < 6 ? '' : '.');
    }
    else if (match[3] && !match[4]) {
        return match[1] + "." + match[2] + "." + match[3] + (cleaned.length < 9 ? '' : '-');
    }
    else {
        return match[1] + "." + match[2] + "." + match[3] + "-" + match[4];
    }
}
exports.default = cpf;
