"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function integer(raw) {
    return raw.match(/^[\d]*$/g);
}
exports.default = integer;
