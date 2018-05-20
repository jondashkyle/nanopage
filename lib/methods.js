module.exports = {
  parseHref
}

function parseHref (str) {
  if (str.length > 1) return str.replace(/\/+$/, '')
  else return str
}
