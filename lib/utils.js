var objectValues = require('object-values')
var objectKeys = require('object-keys')
var resolve = require('resolve-path')
var methods = require('./methods')

module.exports = {
  first,
  isFile,
  isPage,
  isActive,
  // isFirst,
  // isLast,
  last,
  parent,
  shuffle,
  visible
}

function first (state, value) {
  try {
    var obj = value || { }
    return obj[objectKeys(obj)[0]] || { }
  } catch (err) {
    return { }
  }
}

function isActive (state, value) {
  try {
    return value.url === state.href
  } catch (err) {
    return false
  }
}

function isFile (state, value) {
  try {
    return (isPage(state, value) === false)
  } catch (err) {
    return false
  }
}

function isPage (state, value) {
  try {
    return methods.isPage(value)
  } catch (err) {
    return false
  }
}

/*
function isFirst (state, value) {
  try {
    var _parent = parent(state, value)
    if (value.extension) {
      return objectKeys(_parent.files).indexOf(value.filename) === 0
    } else {
      return objectKeys(_parent.pages).indexOf(value.name) === 0
    }
  } catch (err) {
    return false
  }
}

function isLast (state, value) {
  try {
    var _parent = parent(state, value)
    var keys
    if (value.extension) {
      keys = objectKeys(_parent.files)
      return keys.indexOf(value.filename) === keys.length - 1
    } else {
      keys = objectKeys(_parent.pages)
      return keys.indexOf(value.name) === keys.length - 1
    }
  } catch (err) {
    return false
  }
}
*/

function last (state, value) {
  try {
    var obj = value || { }
    var keys = objectKeys(obj)
    return obj[keys[keys.length - 1]] || { }
  } catch (err) {
    return { }
  }
}

function parent (state, value) {
  try {
    var url = resolve(value.url, '../')
    return state.content[url] || { }
  } catch (err) {
    return state.content['/'] || { }
  }
}

function shuffle (state, value) {
  try {
    var array = objectValues(value)
    var i = 0
    var j = 0
    var temp = null

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }

    return array
  } catch (err) {
    return [ ]
  }
}

function visible (state, value) {
  try {
    if (methods.isPage(value)) {
      return value.visible !== false
    } else {
      return objectValues(value).filter(obj => obj.visible !== false)
    }
  } catch (err) {
    return false
  }
}
