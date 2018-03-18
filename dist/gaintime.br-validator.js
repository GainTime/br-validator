/*GainTime BR-validator v1.0.0*/
function preformat(e, text) {
  var n = text ? e.textContent: e.value;
  var a = n;
  var s = text ? text: e.dataset.validate;
  if (n) {
    switch (s) {
      case "cpf":
      a = preformatCpf(n);
      break;
      case "cnpj":
      a = preformatCnpj(n);
      break;
      case "brPhone":
      a = preformatPhone(n);
      break;
      case "cep":
      a = preformatCep(n);
      break;
      case "date":
      a = preformatDate(n);
      break;
    }
    text && (e.innerHTML = a), e.value = a
  } else text ? e.textContent = "": e.value = ""
}

function formater(e) {
  preformat(e);

  e.addEventListener("keyup", function(t) {
    switch (e.dataset.validate) {
      case "date":
        if (isPaste(e, t)) preformat(e)
        else formatDate(e, t);
        break;
      default:
        if (isPaste(e, t)) preformat(e)
        break;
    }
  })

  e.addEventListener("keydown", function(t) {
    switch (e.dataset.validate) {
      case "cpf":
        formatCpf(e, t);
        break;
      case "cnpj":
        formatCnpj(e, t);
        break;
      case "brPhone":
        formatBrPhone(e, t);
        break;
      case "cep":
        formatCep(e, t);
        break;
      case "date":
        onlyNumbers(t);
        break;
      case "num":
        onlyNumbers(t);
        break;
      case "text":
        blockNum(t);
        break;
    }
  })

}

function isPaste(e, t) {
    return (t.ctrlKey && t.keyCode == 86)
}

function onlyNumbers(t) {
  if (isNaN(t.key) && ctrlButtons(t) && !t.ctrlKey && t.key != "Tab" && t.key != "ArrowLeft" && t.key != "ArrowRight" && t.key != "ArrowDown" && t.key != "ArrowUp" && t.key != "Enter" || " " == t.key) {
    t.preventDefault();
    return false;
  }
}

function blockNum(t) {
  if (!isNaN(t.key) && 0 != t.keyCode && 8 != t.keyCode && 46 != t.keyCode && !t.ctrlKey && t.key != "Tab" && t.key != "ArrowLeft" && t.key != "ArrowRight" && t.key != "ArrowDown" && t.key != "ArrowUp" && t.key != "Enter" && " " != t.key) {
    t.preventDefault();
    return false;
  }
}

function ctrlButtons(t) {
  return 0 != t.keyCode && 8 != t.keyCode && 46 != t.keyCode;
}

function preformatPhone(n) {
  var s2 = ("" + n).replace(/\D/g,"");
  if (s2.length <= 10) {
    m = s2.match(/^(\d{1,2})?[- ]?(\d{1,4})?(\d{1,4})?(.*)?$/);
  } else {
    m = s2.match(/^(\d{1,2})?[- ]?(\d{1,5})?(\d{1,4})?(.*)?$/);
  }

  for (var i = 1; i <= 3; i++) if (!m[i]) m[i] = "";
  return m ? "(" + m[1] + ") " + m[2] + "-" + m[3] : null;
}

function preformatCpf(n) {
  s2 = ("" + n).replace(/\D/g,"");
  m = s2.match(/^(\d{1,3})?[- ]??[\s]?(\d{1,3})?[\s]?(\d{1,3})?(.*)?$/);
  for (var i = 1; i <= 4; i++) if (!m[i]) m[i] = "";
  return m ? m[1] + "." + m[2] + "." + m[3] + "-" + m[4] : null;
}

function preformatCnpj(n) {
  s2 = ("" + n).replace(/\D/g,"");
  m = s2.match(/^(\d{1,2})?[- ]??[\s]?(\d{1,3})?[\s]?(\d{1,3})?(\d{1,4})?(\d{1,2})?(.*)?$/);
  for (var i = 1; i <= 5; i++) if (!m[i]) m[i] = "";
  return m ? m[1] + "." + m[2] + "." + m[3] + "/" + m[4] + "-" + m[5] : null;
}

function preformatCep(n) {
  s2 = ("" + n).replace(/\D/g,"");
  m = s2.match(/^(\d{1,5})?[- ]??[\s]?(\d{1,3})?(.*)?$/);
  for (var i = 1; i <= 2; i++) if (!m[i]) m[i] = "";
  return m ? m[1] + "-" + m[2]: null;
}

function preformatDate(n) {
  s2 = ("" + n).replace(/\D/g,"");
  m = s2.match(/^(\d{1,2})?[- ]??[\s]?(\d{1,2})?(.*)?$/);
  for (var i = 1; i <= 3; i++) if (!m[i]) m[i] = "";
  return m ? m[1] + "/" + m[2] + "/" + m[3]: null;
}

function formatCpf(e, t) {
  onlyNumbers(t);
  ctrlButtons(t) && (3 != e.value.length && 7 != e.value.length || (e.value = e.value + "."), 11 == e.value.length && (e.value = e.value + "-"))
}

function formatCnpj(e, t) {
  onlyNumbers(t);
  ctrlButtons(t) && (2 != e.value.length && 6 != e.value.length || (e.value = e.value + "."), 10 == e.value.length && (e.value = e.value + "/"), 15 == e.value.length && (e.value = e.value + "-"))
}

function formatBrPhone(e, t) {
  onlyNumbers(t);
  ctrlButtons(t) && ((0 != e.value.length && e.selectionStart > 1 || t.key == "Tab" || t.key == "Enter" || t.ctrlKey) || (e.value = "\("), e.value[5] == "9" && 10 == e.value.length && (e.value = e.value + "-"), e.value[5] != "9" && 9 == e.value.length && (e.value = e.value + "-"), (3 != e.value.length || (e.value = e.value + "\) ")))
}

function formatCep(e, t) {
  onlyNumbers(t);
  ctrlButtons(t) && (5 != e.value.length || (e.value = e.value + "-"))
}

function formatDate(e, t) {
    onlyNumbers(t);
    ctrlButtons(t) && (2 != e.value.length && 5 != e.value.length || (e.value = e.value + "/"))
}


function validates(e) {
  e.addEventListener("blur", function(t) {
    formater(e)
    switchValidations(e)
  })
}

function switchValidations(e) {
  switch (e.dataset.validate) {
    case "text":
      searcher(e, /^[a-zA-ZÃẼĨÕŨãẽĩõũÁÉÍÓÚáéíóúÂÊÎÔÛâêîôûÀÈÌÒÙàèìòùÄËÏÖÜäëïöü' ]*$/);
      break;
    case "num":
      searcher(e, /^[\d]*$/g);
      break;
    case "cpf":
      validateCpf(e.value) || "" == e.value ? validsIt(e) : invalidsIt(e, "Este CPF é inválido.");
      break;
    case "cnpj":
      validateCnpj(e.value) || "" == e.value ? validsIt(e) : invalidsIt(e, "Este CNPJ é inválido.");
      break;
    case "brPhone":
      validateBrPhone(e.value) || "" == e.value ? validsIt(e) : invalidsIt(e, "Este Telefone é inválido.");
      break;
    case "date":
      validateDate(e.value) || "" == e.value ? validsIt(e) : invalidsIt(e, "Esta data é inválida.");
      break;
    case "cep":
      break;
    default:
      searcher(e, new RegExp(e.dataset.validate))
  }
}

function invalidsIt(a, b) {
  a.style.border = '1px solid #F00', (b)? a.setCustomValidity(b) : a.setCustomValidity("Invalid field.");
}

function validsIt(a) {
  a.style.removeProperty("border"), a.setCustomValidity("");
}

function searcher(e, t) {
  null == e.value.match(t) ? invalidsIt(e, false) : validsIt(e)
}

function validateBrPhone(e) {
  var p = e.replace(/\D/g, '');

  if (!(p.length >= 10 && p.length <= 11) || (p.length == 11 && parseInt(p.substring(2, 3)) != 9)) return !1;

  var ddds = [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 21,
    22, 24, 27, 28, 31, 32, 33, 34, 35, 37,
    38, 41, 42, 43, 44, 45, 46, 47, 48, 49,
    51, 53, 54, 55, 61, 62, 64, 63, 65, 66,
    67, 68, 69, 71, 73, 74, 75, 77, 79, 81,
    82, 83, 84, 85, 86, 87, 88, 89, 91, 92,
    93, 94, 95, 96, 97, 98, 99];

  return !(ddds.indexOf(parseInt(p.substring(0, 2))) == -1);
}

function validateDate(e) {
  var p = e.replace(/\D/g, '');

  var day = parseInt(p.substring(0,2));
  var month = parseInt(p.substring(2,4));
  var year = parseInt(p.substring(4));

  if (day > 30 && (month == 4 || month == 6 || month == 9 || month==11)) return !1;
  if (month == 2) {
    if ((year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0))) {
      if (day > 29) return !1;
    }
    else if (day > 28) return !1;
  }
  if (p.length < 5 || month > 12 || day > 31 || day < 1) return !1;

  return 1;
}

function validateCpf(e) {
  var t = e.replace(/\./g, "");
  t = t.replace(/\-/g, "");
  var o, n;
  if (o = 0, "00000000000" == t) return !1;
  for (i = 1; i <= 9; i++) o += parseInt(t.substring(i - 1, i)) * (11 - i);
  if (n = 10 * o % 11, 10 != n && 11 != n || (n = 0), n != parseInt(t.substring(9, 10))) return !1;
  for (o = 0, i = 1; i <= 10; i++) o += parseInt(t.substring(i - 1, i)) * (12 - i);
  return n = 10 * o % 11, 10 != n && 11 != n || (n = 0), n == parseInt(t.substring(10, 11))
}

function validateCnpj(u) {
  if (u = u.replace(/[^\d]+/g, ""), "" == u) return !1;
  if (14 != u.length) return !1;
  if ("00000000000000" == u || "11111111111111" == u || "22222222222222" == u || "33333333333333" == u || "44444444444444" == u || "55555555555555" == u || "66666666666666" == u || "77777777777777" == u || "88888888888888" == u || "99999999999999" == u) return !1;
  for (n = u.substring(0, 12), d = u.substring(12), t = 12, s = 0, p = 5, i = t; i >= 1; i--) s += n.charAt(t - i) * p--, p < 2 && (p = 9);
  if (r = s % 11 < 2 ? 0 : 11 - s % 11, r != d.charAt(0)) return !1;
  for (n = u.substring(0, 13), t = 13, s = 0, p = 6, i = t; i >= 1; i--) s += n.charAt(t - i) * p--, p < 2 && (p = 9);
  return r = s % 11 < 2 ? 0 : 11 - s % 11, r != d.charAt(1) ? !1 : !0
}

function viacep(input, callback) {
    var result, cep = input.value.replace(/[^0-9]/, "");
    if (cep != "") {
      if (cep.length != 8) {
        invalidsIt(input, "Este CEP é inválido.");
        console.log("OI")
        callback({erro: true});
      }
      var url = "https://viacep.com.br/ws/" + cep + "/json/";
      var http = new XMLHttpRequest();
      http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          result = JSON.parse(this.responseText);
          if (result.erro) {
            invalidsIt(input, "Este CEP é inválido.");
          } else {
            validsIt(input)
          }
          callback(result);
        }
      };
      http.open('GET', url, true);
      http.send();
    } else {
      validsIt(input)
    }
}

var toValidate = [].slice.call(document.querySelectorAll("[data-validate]"));
var ceps=[].slice.call(document.querySelectorAll("[data-validate=cep]"));
toValidate.forEach(function(e) {
  formater(e), validates(e), switchValidations(e)
})
