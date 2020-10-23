module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:22-26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.Formatter = exports.Validator = void 0;
var validators_1 = __webpack_require__(/*! ./validators */ "./src/validators/index.js");
var formatters_1 = __webpack_require__(/*! ./formatters */ "./src/formatters/index.js");
var messages_1 = __webpack_require__(/*! ./messages */ "./src/messages/index.js");
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
    Validator.prototype.check = function (raw, type) {
        return type && validators_1["default"][type] && validators_1["default"][type](raw);
    };
    Validator.prototype.invalid = function (el, type) {
        el.classList.add('c-br-validator--invalid');
        this.options.messages &&
            el.setCustomValidity(messages_1["default"][type] || 'Valor inválido');
    };
    Validator.prototype.valid = function (el) {
        el.classList.remove('c-br-validator--invalid');
        el.setCustomValidity('');
    };
    return Validator;
}());
exports.Validator = Validator;
var Formatter = /** @class */ (function () {
    function Formatter() {
        this.$fields = {};
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
    Formatter.prototype.init = function () {
        var _this = this;
        var candidates = [].slice.call(document.querySelectorAll('[data-validate]'));
        candidates.forEach(function (item) {
            var v = item && item.dataset && item.dataset.validate;
            _this.$fields[v] = Array.isArray(_this.$fields[v])
                ? __spreadArrays(_this.$fields[v], [item]) : [item];
        });
        Object.keys(formatters_1["default"]).forEach(function (key) { return _this.eachFieldFormat(key); });
    };
    Formatter.prototype.eachFieldFormat = function (type) {
        var _this = this;
        return (this.$fields[type] &&
            this.$fields[type].forEach(function (el) {
                _this.formatOnType(el, formatters_1["default"][type]);
                el.value && _this.apply(el, formatters_1["default"][type]);
            }));
    };
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
        this.options = options;
    }
    Br.prototype.init = function () {
        var _this = this;
        this.formatter = new Formatter();
        this.validator = new Validator(this.options);
        this.formatter.init();
        Object.keys(formatters_1["default"]).forEach(function (key) { return _this.eachFieldValidate(key); });
    };
    Br.prototype.eachFieldValidate = function (type) {
        var _this = this;
        return (this.formatter.$fields[type] &&
            this.formatter.$fields[type].forEach(function (el) {
                _this.validateOnBlur(el, type);
                el.value && _this.apply(el, type);
            }));
    };
    Br.prototype.validateOnBlur = function (item, type) {
        var _this = this;
        return item.addEventListener('blur', function (event) {
            if (event.target.value) {
                _this.apply(event.target, type);
            }
        });
    };
    Br.prototype.apply = function (el, type) {
        var valid = this.validator.check(el.value, type);
        valid ? this.validator.valid(el) : this.validator.invalid(el, type);
    };
    return Br;
}());
exports.default = Br;
globalThis.BrValidator = new Br();


/***/ }),

/***/ "./src/formatters/cep.js":
/*!*******************************!*\
  !*** ./src/formatters/cep.js ***!
  \*******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ cep
/* harmony export */ });
function cep(raw) {
  const cleaned = ('' + raw).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{1,5})?[- ]??[\s]?(\d{1,3})?(.*)?$/)

  for (let i = 1; i <= 2; i++) {
    if (!match[i]) {
      match[i] = ''
    }
  }

  if (!match[1] || cleaned.length < 5) {
    return raw
  } else {
    return `${match[1]}-${match[2]}`
  }
}


/***/ }),

/***/ "./src/formatters/cnpj.js":
/*!********************************!*\
  !*** ./src/formatters/cnpj.js ***!
  \********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ cnpj
/* harmony export */ });
function cnpj(raw) {
  const cleaned = ('' + raw).replace(/\D/g, '')
  const regex = /^(\d{1,2})?[- ]??[\s]?(\d{1,3})?[\s]?(\d{1,3})?(\d{1,4})?(\d{1,2})?(.*)?$/
  const match = cleaned.match(regex)

  for (let i = 1; i <= 5; i++) {
    if (!match[i]) {
      match[i] = ''
    }
  }

  if (!match[1] || cleaned.length < 3) {
    return raw
  } else if (match[1] && !match[2]) {
    return `${match[1]}.`
  } else if (match[2] && !match[3]) {
    return `${match[1]}.${match[2]}${cleaned.length < 5 ? '' : '.'}`
  } else if (match[3] && !match[4]) {
    return `${match[1]}.${match[2]}.${match[3]}${cleaned.length < 8 ? '' : '/'}`
  } else if (match[4] && !match[5]) {
    return `${match[1]}.${match[2]}.${match[3]}/${match[4]}${
      cleaned.length < 12 ? '' : '-'
    }`
  } else {
    return `${match[1]}.${match[2]}.${match[3]}/${match[4]}${match[5]}`
  }
}


/***/ }),

/***/ "./src/formatters/cpf.js":
/*!*******************************!*\
  !*** ./src/formatters/cpf.js ***!
  \*******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ cpf
/* harmony export */ });
function cpf(raw) {
  const cleaned = ('' + raw).replace(/\D/g, '')
  const regex = /^(\d{1,3})?[- ]??[\s]?(\d{1,3})?[\s]?(\d{1,3})?(.*)?$/
  const match = cleaned.match(regex)

  for (let i = 1; i <= 4; i++) {
    if (!match[i]) match[i] = ''
  }

  if (!match[1] || cleaned.length < 3) {
    return raw
  } else if (match[1] && !match[2]) {
    return `${match[1]}.`
  } else if (match[2] && !match[3]) {
    return `${match[1]}.${match[2]}${cleaned.length < 6 ? '' : '.'}`
  } else if (match[3] && !match[4]) {
    return `${match[1]}.${match[2]}.${match[3]}${cleaned.length < 9 ? '' : '-'}`
  } else {
    return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`
  }
}


/***/ }),

/***/ "./src/formatters/date.js":
/*!********************************!*\
  !*** ./src/formatters/date.js ***!
  \********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ date
/* harmony export */ });
function date(raw) {
  const cleaned = ('' + raw).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{1,2})?[- ]??[\s]?(\d{1,2})?(.*)?$/)

  for (let i = 1; i <= 3; i++) {
    if (!match[i]) {
      match[i] = ''
    }
  }

  if (!match[1] || cleaned.length < 2) {
    return raw
  } else if (match[1] && !match[2]) {
    return `${match[1]}/`
  } else if (match[2] && !match[3]) {
    return `${match[1]}/${match[2]}${cleaned.length < 4 ? '' : '/'}`
  } else if (match[3]) {
    return `${match[1]}/${match[2]}/${match[3]}`
  }
}


/***/ }),

/***/ "./src/formatters/index.js":
/*!*********************************!*\
  !*** ./src/formatters/index.js ***!
  \*********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _cpf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cpf */ "./src/formatters/cpf.js");
/* harmony import */ var _phone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./phone */ "./src/formatters/phone.js");
/* harmony import */ var _cnpj__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cnpj */ "./src/formatters/cnpj.js");
/* harmony import */ var _cep__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cep */ "./src/formatters/cep.js");
/* harmony import */ var _date__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./date */ "./src/formatters/date.js");






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  cpf: _cpf__WEBPACK_IMPORTED_MODULE_0__.default,
  phone: _phone__WEBPACK_IMPORTED_MODULE_1__.default,
  cnpj: _cnpj__WEBPACK_IMPORTED_MODULE_2__.default,
  cep: _cep__WEBPACK_IMPORTED_MODULE_3__.default,
  date: _date__WEBPACK_IMPORTED_MODULE_4__.default
});


/***/ }),

/***/ "./src/formatters/phone.js":
/*!*********************************!*\
  !*** ./src/formatters/phone.js ***!
  \*********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ phone
/* harmony export */ });
function phone(raw) {
  const cleaned = ('' + raw).replace(/\D/g, '')
  let match = []

  if (cleaned.length <= 10) {
    match = cleaned.match(/^(\d{1,2})?[- ]?(\d{1,4})?(\d{1,4})?(.*)?$/)
  } else {
    match = cleaned.match(/^(\d{1,2})?[- ]?(\d{1,5})?(\d{1,4})?(.*)?$/)
  }

  for (let i = 1; i <= 3; i++) {
    if (!match[i]) {
      match[i] = ''
    }
  }

  if (!match[1] || cleaned.length < 2) {
    return raw
  } else if (match[1] && !match[2]) {
    return `(${match[1]}) `
  } else if (match[2] && !match[3]) {
    return `(${match[1]}) ${match[2]}${cleaned.length < 6 ? '' : '-'}`
  } else if (match[3]) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
}


/***/ }),

/***/ "./src/messages/index.js":
/*!*******************************!*\
  !*** ./src/messages/index.js ***!
  \*******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  cpf: 'Este CPF é inválido.',
  cnpj: 'Este CNPJ é inválido.',
  phone: 'Este Telefone é inválido.',
  date: 'Esta Data é inválida.',
  cep: 'Este CEP é inválido.'
});


/***/ }),

/***/ "./src/validators/cnpj.js":
/*!********************************!*\
  !*** ./src/validators/cnpj.js ***!
  \********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ cnpj
/* harmony export */ });
function cnpj(u) {
  if (((u = u.replace(/[^\d]+/g, '')), '' == u)) return !1
  if (14 != u.length) return !1
  if (
    '00000000000000' == u ||
    '11111111111111' == u ||
    '22222222222222' == u ||
    '33333333333333' == u ||
    '44444444444444' == u ||
    '55555555555555' == u ||
    '66666666666666' == u ||
    '77777777777777' == u ||
    '88888888888888' == u ||
    '99999999999999' == u
  )
    return !1
  for (
    n = u.substring(0, 12), d = u.substring(12), t = 12, s = 0, p = 5, i = t;
    i >= 1;
    i--
  )
    (s += n.charAt(t - i) * p--), p < 2 && (p = 9)
  if (((r = s % 11 < 2 ? 0 : 11 - (s % 11)), r != d.charAt(0))) return !1
  for (n = u.substring(0, 13), t = 13, s = 0, p = 6, i = t; i >= 1; i--)
    (s += n.charAt(t - i) * p--), p < 2 && (p = 9)
  return (r = s % 11 < 2 ? 0 : 11 - (s % 11)), r != d.charAt(1) ? !1 : !0
}


/***/ }),

/***/ "./src/validators/cpf.js":
/*!*******************************!*\
  !*** ./src/validators/cpf.js ***!
  \*******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ cpf
/* harmony export */ });
function cpf(raw) {
  const blacklist = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999'
  ]

  const cleaned = raw.replace(/\./g, '').replace(/\-/g, '')

  if (blacklist.includes(cleaned)) {
    return false
  }

  let sum = 0
  let check = 0

  // First digit
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i)
  }

  if (
    ((check = (10 * sum) % 11),
    (10 != check && 11 != check) || (check = 0),
    check != parseInt(cleaned.substring(9, 10)))
  ) {
    return false
  }

  // Second digit
  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i)
  }

  return (
    (check = (10 * sum) % 11),
    (10 != check && 11 != check) || (check = 0),
    check == parseInt(cleaned.substring(10, 11))
  )
}


/***/ }),

/***/ "./src/validators/date.js":
/*!********************************!*\
  !*** ./src/validators/date.js ***!
  \********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ date
/* harmony export */ });
function date(raw) {
  const cleaned = raw.replace(/\D/g, '')

  const day = parseInt(cleaned.substring(0, 2))
  const month = parseInt(cleaned.substring(2, 4))
  const year = parseInt(cleaned.substring(4))
  const d30 = [4, 6, 9, 11]

  if (day > 30 && d30.includes(month)) {
    return false
  }

  if (month === 2) {
    if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) {
      if (day > 29) {
        return false
      }
    } else if (day > 28) {
      return falses
    }
  }

  return !(cleaned.length < 5 || month > 12 || day > 31 || day < 1)
}


/***/ }),

/***/ "./src/validators/index.js":
/*!*********************************!*\
  !*** ./src/validators/index.js ***!
  \*********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _cpf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cpf */ "./src/validators/cpf.js");
/* harmony import */ var _phone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./phone */ "./src/validators/phone.js");
/* harmony import */ var _cnpj__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cnpj */ "./src/validators/cnpj.js");
/* harmony import */ var _date__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./date */ "./src/validators/date.js");



// import cep from './cep'


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  cpf: _cpf__WEBPACK_IMPORTED_MODULE_0__.default,
  phone: _phone__WEBPACK_IMPORTED_MODULE_1__.default,
  cnpj: _cnpj__WEBPACK_IMPORTED_MODULE_2__.default,
  // cep,
  date: _date__WEBPACK_IMPORTED_MODULE_3__.default
});


/***/ }),

/***/ "./src/validators/phone.js":
/*!*********************************!*\
  !*** ./src/validators/phone.js ***!
  \*********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ phone
/* harmony export */ });
function phone(raw) {
  let cleaned = raw.replace(/\D/g, '')

  if (
    !(cleaned.length >= 10 && cleaned.length <= 11) ||
    (cleaned.length == 11 && parseInt(cleaned.substring(2, 3)) != 9)
  ) {
    return false
  }

  const ddds = [11, 12, 13, 14, 15, 16, 17, 18, 19].concat(
    [21, 22, 24, 27, 28],
    [31, 32, 33, 34, 35, 37, 38],
    [41, 42, 43, 44, 45, 46, 47, 48, 49],
    [51, 53, 54, 55],
    [61, 62, 64, 63, 65, 66, 67, 68, 69],
    [71, 73, 74, 75, 77, 79],
    [81, 82, 83, 84, 85, 86, 87, 88, 89],
    [91, 92, 93, 94, 95, 96, 97, 98, 99]
  )

  return ddds.includes(parseInt(cleaned.substring(0, 2)))
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/index.ts");
/******/ })()
;