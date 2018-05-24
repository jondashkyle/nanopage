var parsePath = require('parse-filepath')

module.exports = {
  parseHref,
  isDate,
  isFile,
  isPage,
  hasUrl
}

function parseHref (str) {
  if (str.length > 1) return str.replace(/\/+$/, '')
  else return str
}

function isDate (str) {
  return /^\d{4}-\d{1,2}-\d{1,2}$/.test(str)
}

function isFile (value) {
  return isPage(value) === false
}

function isPage (value) {
  try {
    var url = hasUrl(value) ? value.url : value
    return parsePath(url).ext === ''
  } catch (err) {
    return false
  }
}

function hasUrl (value) {
  return (
    typeof value === 'object' &&
    typeof value.url === 'string'
  )
}
