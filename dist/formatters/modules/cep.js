"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cep(raw) {
    var cleaned = ('' + raw).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{1,5})?[- ]??[\s]?(\d{1,3})?(.*)?$/);
    for (var i = 1; i <= 2; i++) {
        if (!match[i]) {
            match[i] = '';
        }
    }
    if (!match[1] || cleaned.length < 5) {
        return raw;
    }
    else {
        return match[1] + "-" + match[2];
    }
}
exports.default = cep;
