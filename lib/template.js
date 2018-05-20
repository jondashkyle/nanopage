var objectValues = require('object-values')
var objectKeys = require('object-keys')
var methods = require('./methods')
var utils = require('./utils')

module.exports = class NanoTemplate {
  constructor (state, value) {
    var self = this

    // defaults
    state = state || { }
    state.content = state.content || { }

    // fallback route
    state.href = methods.parseHref(state.href || '/')

    // private data
    this._state = state || { }
    this._value = value || { }

    // add utilities
    objectKeys(utils).forEach(function (key) {
      self[key] = function (...args) {
        this._value = utils[key](this._state, this._value, ...args)
        return this
      }
    })
  }

  keys (key) {
    var obj = (typeof key !== 'undefined') ? this._value[key] : this._value
    if (typeof obj === 'object') {
      return objectKeys(obj) || [ ]
    } else {
      return obj || [ ]
    }
  }

  source () {
    return this.value('source')
  }

  toArray (key) {
    return this.values(key)
  }

  url () {
    try {
      return this._value.url || ''
    } catch (err) {
      return ''
    }
  }

  v (key) {
    return this.value(key)
  }

  value (key) {
    try {
      return (typeof key !== 'undefined')
        ? this._value[key] || undefined
        : this._value || undefined
    } catch (err) {
      return undefined
    }
  }

  values (key) {
    var obj = (typeof key !== 'undefined') ? this._value[key] : this._value
    if (typeof obj === 'object') {
      return objectValues(obj) || [ ]
    } else {
      return obj || [ ]
    }
  }
}
