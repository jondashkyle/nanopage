var test = require('tape')
var Page = require('./lib')

var page = new Page(createState())

test('output', function (t) {
  t.ok(typeof page === 'function', 'outputs function')
  t.end()
})

test('value', function (t) {
  t.ok(typeof page().value() === 'object', 'value is a type object')
  t.ok(typeof page().v() === 'object', 'v alias for value')
  t.ok(page().value('title') === 'Index', 'value argument key')
  t.end()
})

test('arrays', function (t) {
  var state = { one: '1', two: '2' }
  t.ok(Array.isArray(page(state).toArray()), 'to array')
  t.ok(Array.isArray(page(state).values()), 'values')
  t.ok(Array.isArray(page(state).keys()), 'keys')
  t.ok(page(state).values()[0] === '1', 'values order')
  t.ok(page(state).keys()[1] === 'two', 'keys order')
  t.end()
})

test('pages', function (t) {
  t.ok(typeof page('/').children().value() === 'object', 'children is type object')
  t.ok(page('/').children().toArray().length === 2, 'correct number of children')
  t.end()
})

test('sort', function (t) {
  var alphaAsc = page('/').children().sortBy('title', 'asc').value()
  var alphaDesc = page('/').children().sortBy('title', 'desc').value()
  var dateAsc = page('/').children().sortBy('date', 'asc').value()
  var dateDesc = page('/').children().sortBy('date', 'desc').value()

  t.ok(alphaAsc[0].title === 'About', 'alpha ascend')
  t.ok(alphaDesc[0].title === 'Example', 'alpha descend')
  t.ok(dateAsc[0].date === '2018-02-01', 'date ascend')
  t.ok(dateDesc[0].date === '2018-03-01', 'date descend')

  t.end()
})

test('passsing urls', function (t) {
  t.ok(page('/').value('title') === 'Index', 'able to locate index')
  t.ok(page('/about').value('title') === 'About', 'able to locate sub-page')
  t.ok(page('/about/').value('title') === 'About', 'remove trailing slash')
  t.end()
})

test('find', function (t) {
  t.ok(page().find('/about').value('title') === 'About', 'absolute')
  t.ok(page('/example').find('child').value('title') === 'Child', 'relative')
  t.end()
})

test('parent', function (t) {
  t.ok(page('/about').parent().value('title') === 'Index', 'parent')
  t.end()
})

function createState () {
  return {
    href: '/',
    content: {
      '/': {
        title: 'Index',
        date: '2018-01-01',
        text: 'Hello!',
        tags: ['one', 'two', 'three'],
        url: '/'
      },
      '/about': {
        title: 'About',
        date: '2018-03-01',
        text: 'Just another page',
        url: '/about'
      },
      '/example': {
        title: 'Example',
        date: '2018-02-01',
        text: 'This is a test',
        url: '/example'
      },
      '/example/child': {
        title: 'Child',
        date: '2018-04-01',
        text: 'Look ma I’m nested',
        url: '/example/child'
      }
    }
  }
}
