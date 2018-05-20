var objectValues = require('object-values')
var objectKeys = require('object-keys')
var resolve = require('resolve-path')
var methods = require('../methods')

module.exports = {
  children,
  file,
  files,
  find,
  hasView,
  images,
  pages,
  sortBy
}

function children (state, value) {
  // alias for pages
  return pages(state, value)
}

function file (state, value, key) {
  // alias for find
  return find(state, value, key)
}

function files (state, value) {
  try {
    return value.files || { }
  } catch (err) {
    return { }
  }
}

function find (state, value, url) {
  try {
    // normalize
    url = methods.parseHref(url)

    // grab from root
    if (url.indexOf('/') === 0) {
      return state.content[url]
    }

    // if on a page grab relative
    if (typeof value.url === 'string') {
      return state.content[resolve(value.url, url)]
    }

    // fall back to href
    return state.content[resolve(state.href || '/', url)]
  } catch (err) {
    return { }
  }
}

function hasView (state, value) {
  try {
    return typeof this._value.view !== 'undefined'
  } catch (err) {
    return false
  }
}

function images (state, value) {
  try {
    return objectKeys(value.files).reduce(function (res, cur) {
      if (
        typeof value.files[cur] === 'object' &&
        value.files[cur].type === 'image'
      ) {
        res[cur] = value.files[cur]
      }
      return res
    }, { })
  } catch (err) {
    return { }
  }
}

function pages (state, value) {
  try {
    var base = value.url.replace(/^\//, '') ? value.url : ''
    var regex = new RegExp('^' + base + '/[^/]+/?$')
    return objectKeys(state.content)
      .filter(key => regex.test(key.trim()))
      .reduce(readPage, { })
  } catch (err) {
    return { }
  }

  function readPage (result, key) {
    var page = state.content[key]
    if (methods.isPage(page)) result[key] = page
    return result
  }
}

function sortBy (state, value, key, order) {
  try {
    return objectValues(value).sort(sort)
  } catch (err) {
    return [ ]
  }

  function sort (a, b) {
    try {
      var alpha = a[key]
      var beta = b[key]

      // reverse order
      if (order === 'desc') {
        alpha = b[key]
        beta = a[key]
      }

      // date or string
      if (methods.isDate(alpha) && methods.isDate(beta)) {
        return new Date(alpha) - new Date(beta)
      } else {
        return alpha.localeCompare(beta)
      }
    } catch (err) {
      return 0
    }
  }
}
