module.exports = {
  parseHref,
  isDate
}

function parseHref (str) {
  if (str.length > 1) return str.replace(/\/+$/, '')
  else return str
}

function isDate (str) {
  return /^\d{4}-\d{1,2}-\d{1,2}$/.test(str)
}
