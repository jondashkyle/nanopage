var Page = require('./lib')

module.exports = plugin

function plugin (state, emit) {
  state.page = new Page(state)
}
