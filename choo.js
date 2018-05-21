var File = require('./lib/file')
var Page = require('./lib/page')

module.exports = plugin

function plugin (state, emit) {
  state.content = state.content || { }
  state.file = new File(state)
  state.page = new Page(state)
}
