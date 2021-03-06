var objectValues = require('object-values')
var objectKeys = require('object-keys')
var methods = require('./methods')
var utils = require('./utils')

module.exports = wrapper

class Page {
  constructor (state, value) {
    // defaults
    state = state || { }
    state.content = state.content || { }

    // fallback route
    state.href = methods.parseHref(state.href || '/')

    // private data
    this._state = state || { }
    this._value = value || { }
  }

  url () {
    try {
      // file or page
      if (this._value.extension) return this._value.source || ''
      else return this._value.url || ''
    } catch (err) {
      return ''
    }
  }

  keys (key) {
    var obj = (typeof key !== 'undefined') ? this._value[key] : this._value
    if (typeof obj === 'object') {
      return objectKeys(obj) || [ ]
    } else {
      return obj || [ ]
    }
  }

  toArray (key) {
    return this.values(key)
  }

  values (key) {
    var obj = (typeof key !== 'undefined') ? this._value[key] : this._value
    if (typeof obj === 'object') {
      return objectValues(obj) || [ ]
    } else {
      return obj || [ ]
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
}

// dynamically add tools
objectKeys(utils).forEach(function (key) {
  Page.prototype[key] = function (...args) {
    this._value = utils[key](this._state, this._value, ...args)
    return this
  }
})

function wrapper (state) {
  // defaults
  state = state || { }
  state.content = state.content || { }

  // compose and get on with it
  return function (value) {
    return new Page(state, parseValue(value))
  }

  function parseValue (value) {
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
}
