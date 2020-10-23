"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cpf_1 = require("./modules/cpf");
var phone_1 = require("./modules/phone");
var cnpj_1 = require("./modules/cnpj");
var date_1 = require("./modules/date");
var text_1 = require("./modules/text");
var integer_1 = require("./modules/integer");
exports.default = {
    cpf: cpf_1.default,
    phone: phone_1.default,
    cnpj: cnpj_1.default,
    date: date_1.default,
    text: text_1.default,
    integer: integer_1.default
};
