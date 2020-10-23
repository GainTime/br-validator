"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formatter = exports.Validator = exports.cep = void 0;
var validators_1 = require("./validators");
var formatters_1 = require("./formatters");
var messages_1 = require("./messages");
function cep(el, callback) {
    var cep = el.value.replace(/[^0-9]/, '');
    var validator = new Validator();
    if (cep.length != 8) {
        return validator.invalid(el, 'cep');
    }
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            callback(result);
            return result.erro ? validator.invalid(el, 'cep') : validator.valid(el);
        }
    };
    http.open('GET', 'https://viacep.com.br/ws/' + cep + '/json/', true);
    http.send();
}
exports.cep = cep;
var Validator = /** @class */ (function () {
    function Validator(options) {
        if (options === void 0) { options = { css: true, messages: true }; }
        this.options = options;
        if (this.options.css) {
            var style = document.createElement('style');
            style.innerHTML = '.c-br-validator--invalid { border-color: #F00; }';
            var heads = document.getElementsByTagName('head');
            if (heads && heads[0]) {
                heads[0].appendChild(style);
            }
        }
    }
    Validator.prototype.check = function (raw, type, callback) {
        if (callback === void 0) { callback = null; }
        return type && validators_1.default[type] && validators_1.default[type](raw, callback);
    };
    Validator.prototype.invalid = function (el, type) {
        el.classList.add('c-br-validator--invalid');
        this.options.messages &&
            el.setCustomValidity(messages_1.default[type] || 'Valor inválido');
    };
    Validator.prototype.valid = function (el) {
        el.classList.remove('c-br-validator--invalid');
        el.setCustomValidity('');
    };
    Validator.prototype.validateOnBlur = function (item, type) {
        var _this = this;
        return (validators_1.default[type] &&
            item.addEventListener('blur', function (event) {
                if (event.target.value) {
                    _this.apply(event.target, type);
                }
            }));
    };
    Validator.prototype.apply = function (el, type) {
        var callback = null;
        if (type === 'cep' && el.dataset.callback) {
            callback = el.dataset.callback;
        }
        var valid = this.check(el.value, type, callback);
        valid ? this.valid(el) : this.invalid(el, type);
    };
    return Validator;
}());
exports.Validator = Validator;
var Formatter = /** @class */ (function () {
    function Formatter() {
        this.controlKeys = [
            'backspace',
            'delete',
            'home',
            'pageup',
            'pagedown',
            'end',
            'printscreen',
            'tab',
            'capslock',
            'control',
            'alt',
            'meta',
            'altgraph',
            'escape',
            'arrowleft',
            'arrowup',
            'arrowright',
            'numlock',
            'enter',
            'shift',
            'scrolllock',
            'pause'
        ];
    }
    Formatter.prototype.formatOnType = function (el, callback) {
        var _this = this;
        this.keyup(el, function (info) {
            if (!info.controller) {
                _this.apply(el, callback);
            }
        });
    };
    Formatter.prototype.keyup = function (item, callback) {
        var _this = this;
        return item.addEventListener('keyup', function (event) {
            return callback({
                ctrlV: event.ctrlKey && event.key.toLowerCase() === 'v',
                controller: event.key && _this.controlKeys.includes(event.key.toLowerCase()),
                key: event.key
            });
        });
    };
    Formatter.prototype.apply = function (el, callback) {
        if (callback === void 0) { callback = null; }
        el && el.value, (el.value = callback(el.value));
    };
    return Formatter;
}());
exports.Formatter = Formatter;
var Br = /** @class */ (function () {
    function Br(options) {
        if (options === void 0) { options = { css: true, messages: true }; }
        this.fields = {};
        this.options = options;
    }
    Br.prototype.init = function () {
        var _this = this;
        this.formatter = new Formatter();
        this.validator = new Validator(this.options);
        var candidates = [].slice.call(document.querySelectorAll('[data-validate]'));
        candidates.forEach(function (item) {
            var v = item && item.dataset && item.dataset.validate;
            _this.fields[v] = Array.isArray(_this.fields[v])
                ? __spreadArrays(_this.fields[v], [item]) : [item];
        });
        Object.keys(formatters_1.default).forEach(function (key) { return _this.eachFieldFormat(key); });
        Object.keys(validators_1.default).forEach(function (key) { return _this.eachFieldValidate(key); });
        return this;
    };
    Br.prototype.eachFieldFormat = function (type) {
        var _this = this;
        return (formatters_1.default[type] &&
            this.fields[type] &&
            this.fields[type].forEach(function (el) {
                _this.formatter.formatOnType(el, formatters_1.default[type]);
                el.value && _this.formatter.apply(el, formatters_1.default[type]);
            }));
    };
    Br.prototype.eachFieldValidate = function (type) {
        var _this = this;
        return (this.fields[type] &&
            this.fields[type].forEach(function (el) {
                _this.validator.validateOnBlur(el, type);
                el.value && _this.validator.apply(el, type);
            }));
    };
    return Br;
}());
exports.default = Br;
