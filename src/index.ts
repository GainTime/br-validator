import validators from './validators'
import formatters from './formatters'
import messages from './messages'

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
  check(raw, type) {
    return type && validators[type] && validators[type](raw)
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
}

export class Formatter {
  $fields: any = {}

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

  init() {
    const candidates = [].slice.call(
      document.querySelectorAll('[data-validate]')
    )

    candidates.forEach((item) => {
      const v = item && item.dataset && item.dataset.validate
      this.$fields[v] = Array.isArray(this.$fields[v])
        ? [...this.$fields[v], item]
        : [item]
    })

    Object.keys(formatters).forEach((key) => this.eachFieldFormat(key))
  }

  eachFieldFormat(type) {
    return (
      this.$fields[type] &&
      this.$fields[type].forEach((el) => {
        this.formatOnType(el, formatters[type])
        el.value && this.apply(el, formatters[type])
      })
    )
  }

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
  constructor(options = { css: true, messages: true }) {
    this.options = options
  }

  init() {
    this.formatter = new Formatter()
    this.validator = new Validator(this.options)
    this.formatter.init()
    Object.keys(formatters).forEach((key) => this.eachFieldValidate(key))
  }

  eachFieldValidate(type) {
    return (
      this.formatter.$fields[type] &&
      this.formatter.$fields[type].forEach((el) => {
        this.validateOnBlur(el, type)
        el.value && this.apply(el, type)
      })
    )
  }

  validateOnBlur(item, type) {
    return item.addEventListener('blur', (event) => {
      if (event.target.value) {
        this.apply(event.target, type)
      }
    })
  }

  apply(el, type) {
    const valid = this.validator.check(el.value, type)
    valid ? this.validator.valid(el) : this.validator.invalid(el, type)
  }
}

globalThis.BrValidator = new Br()
