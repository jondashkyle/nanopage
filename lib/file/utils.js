module.exports = {
  size,
  source: noop
}

function size (state, value, size) {
  try {
    return value.sizes[size.toString()]
  } catch (err) {
    return ''
  }
}

function noop () { }
