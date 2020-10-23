"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cpf_1 = require("./modules/cpf");
var phone_1 = require("./modules/phone");
var cnpj_1 = require("./modules/cnpj");
var cep_1 = require("./modules/cep");
var date_1 = require("./modules/date");
exports.default = {
    cpf: cpf_1.default,
    phone: phone_1.default,
    cnpj: cnpj_1.default,
    cep: cep_1.default,
    date: date_1.default
};
