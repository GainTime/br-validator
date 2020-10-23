import validators from './validators'
import formatters from './formatters'
import messages from './messages'

export function cep(el, callback) {
  const cep = el.value.replace(/[^0-9]/, '')
  const validator = new Validator()
  if (cep.length != 8) {
    return validator.invalid(el, 'cep')
  }

  const http = new XMLHttpRequest()

  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const result = JSON.parse(this.responseText)
      callback(result)
      return result.erro ? validator.invalid(el, 'cep') : validator.valid(el)
    }
  }
  http.open('GET', 'https://viacep.com.br/ws/' + cep + '/json/', true)
  http.send()
}
export class Validator {
  options: any

  constructor(options = { css: true, messages: true }) {
    this.options = options
    if (this.options.css) {
      const style = document.createElement('style')
      style.innerHTML = '.c-br-validator--invalid { border-color: #F00; }'
      const heads = document.getElementsByTagName('head')
      if (heads && heads[0]) {
        heads[0].appendChild(style)
      }
    }
  }

  check(raw, type, callback = null) {
    return type && validators[type] && validators[type](raw, callback)
  }

  invalid(el, type) {
    el.classList.add('c-br-validator--invalid')
    this.options.messages &&
      el.setCustomValidity(messages[type] || 'Valor inválido')
  }

  valid(el) {
    el.classList.remove('c-br-validator--invalid')
    el.setCustomValidity('')
  }

  validateOnBlur(item, type) {
    return (
      validators[type] &&
      item.addEventListener('blur', (event) => {
        if (event.target.value) {
          this.apply(event.target, type)
        }
      })
    )
  }

  apply(el, type) {
    let callback = null
    if (type === 'cep' && el.dataset.callback) {
      callback = el.dataset.callback
    }
    const valid = this.check(el.value, type, callback)
    valid ? this.valid(el) : this.invalid(el, type)
  }
}

export class Formatter {
  controlKeys = [
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
  ]

  formatOnType(el, callback) {
    this.keyup(el, (info) => {
      if (!info.controller) {
        this.apply(el, callback)
      }
    })
  }

  keyup(item, callback) {
    return item.addEventListener('keyup', (event) => {
      return callback({
        ctrlV: event.ctrlKey && event.key.toLowerCase() === 'v',
        controller:
          event.key && this.controlKeys.includes(event.key.toLowerCase()),
        key: event.key
      })
    })
  }

  apply(el, callback = null) {
    el && el.value, (el.value = callback(el.value))
  }
}

export default class Br {
  formatter: Formatter
  validator: Validator
  options: any
  fields: any = {}

  constructor(options = { css: true, messages: true }) {
    this.options = options
  }

  init() {
    this.formatter = new Formatter()
    this.validator = new Validator(this.options)

    const candidates = [].slice.call(
      document.querySelectorAll('[data-validate]')
    )

    candidates.forEach((item) => {
      const v = item && item.dataset && item.dataset.validate
      this.fields[v] = Array.isArray(this.fields[v])
        ? [...this.fields[v], item]
        : [item]
    })

    Object.keys(formatters).forEach((key) => this.eachFieldFormat(key))
    Object.keys(validators).forEach((key) => this.eachFieldValidate(key))
    return this
  }

  eachFieldFormat(type) {
    return (
      formatters[type] &&
      this.fields[type] &&
      this.fields[type].forEach((el) => {
        this.formatter.formatOnType(el, formatters[type])
        el.value && this.formatter.apply(el, formatters[type])
      })
    )
  }

  eachFieldValidate(type) {
    return (
      this.fields[type] &&
      this.fields[type].forEach((el) => {
        this.validator.validateOnBlur(el, type)
        el.value && this.validator.apply(el, type)
      })
    )
  }
}
