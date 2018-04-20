var Page = require('./lib')

module.exports = plugin

function plugin (state, emit) {
  state.content = state.content || { }
  state.page = new Page(state)
}
