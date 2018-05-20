var NanoTemplate = require('../template')
var objectKeys = require('object-keys')
var methods = require('../methods')
var utils = require('./utils')

module.exports = wrapper

class Page extends NanoTemplate {
  constructor (state, value) {
    super(state, value)
    var self = this

    // add utilities
    objectKeys(utils).forEach(function (key) {
      self[key] = function (...args) {
        this._value = utils[key](this._state, this._value, ...args)
        return this
      }
    })
  }
}

function wrapper (state) {
  return function (value) {
    return new Page(state, parseInitialValue(state, value))
  }
}

function parseInitialValue (state, value) {
  // defaults
  state = state || { }
  state.content = state.content || { }

  // grab our content
  var href = state.href || '/'
  var page = state.content[methods.parseHref(href)] || { }

  // set the value
  switch (typeof value) {
    case 'string':
      // if passing a string assume we want a url
      return utils.find(state, page, value)
    case 'object':
      // if an object and it contains value grab that value
      if (typeof value.value === 'function') return value.value()
      else return value
    default:
      // if no value, pass our page
      return value || page
  }
}
