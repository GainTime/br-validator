"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function text(raw) {
    return raw.match(/^[a-zA-ZÃẼĨÕŨãẽĩõũÁÉÍÓÚáéíóúÂÊÎÔÛâêîôûÀÈÌÒÙàèìòùÄËÏÖÜäëïöü' ]*$/);
}
exports.default = text;
