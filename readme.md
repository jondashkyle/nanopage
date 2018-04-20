<h1 align="center">nanopage</h1>

`nanopage` is a super easy way of traversing flat content state.

```
npm i nanopage --save
```

## Example

```js
var Page = require('nanopage')

// some content state
var state = {
  href: '/',
  content: {
    '/': {
      title: 'Just a site',
      text: 'With some text',
      tags: ['and', 'some', 'tags']
    },
    '/example': {
      title: 'Example',
      text: 'Scope it out',
      great: {
        demo: 'Am I right?',
        nah: 'Ok nbd.'
      }
    }
  }
}

// instantiate the page
var page = new Page(state)

// directly access pages by their href
var site = page('/').value()
var about = page('/example').value()

// grab children and files
var children = page().children().sort('name', 'asc').value()
var files = page().files().value()

// create new queries from previous
var first = page(children).first().value()
var last = page(children).last().value()

// access specific keys
var lastTitle = page(last).value('title') // like this
var lastTitle = page(last).value().title // or like this
```

## Usage

- Every method (almost) is chainable
- End a query and return it’s value by calling `.value()` or `.v()`
- Values can be reused in new queries by doing `page(oldQuery)`

Want to transform a directory of files and folders into flat content state? Try [hypha](https://github.com/jondashkyle/hypha)! Super handy to use with [Enoki](https://github.com/enokidotsite/enoki) and [Choo](https://github.com/choojs/choo). If using Choo, you might [not even need it](#extra).

## Philosophy

State is really handy. Especially global state. We ended up with state when webapps started to get really complex and we needed all of the interface to stay in sync with new data and minimize the amount of updates happening to the DOM.

After a while, we started using state for sites too. That is, sites that look more like sites and less like apps. Mostly because state is super handy. However, state can get really messy as sites get larger. Where do you store data? How do you reference it? If you have ten nested pages, do you have ten nested objects?

Instead of all of this complexity, lets reintroduce the URL. Each page url of your site is a key in a flat object. We can simply use the `window.location` to grab the data/content for the current page. Or, we can use any arbitrary url, like `/members/nelson`.

This way of organizing state for sites as a flat object of page urls makes it super trivial to access content in your views and pass it down into components, or whatever. Ok cool!

## Extra

Using Choo? Try the plugin! Don’t need all the bells and whistles? Try creating your own basic Choo plugin from scratch.

<details><summary><b>Use the Choo plugin</b></summary>

```js
var html = require('choo/html')
var choo = require('choo')
var app = choo()

app.use(require('nanopage/choo'))

app.route('*', function (state, emit) {
  return html`
    <body>${state.page().value('title')}</body>
  `
})

if (module.parent) module.exports = app
else app.mount('body')
```
</details>

<details><summary><b>Basic vanilla Choo plugin</b></summary>

```js
app.use(function (state, emitter) {
  state.page = function (key) {
    key = key || (state.href || '/')
    return state.content[key]
  }
})
```
</details>

## Methods

#### `.children()`

Alias for `.pages()`.

#### `.file(filename)`

Grab an individual file. For example, `.file('example.jpg')`.

#### `.files()`

Files of the current `page`.

#### `.find(href)`

Locate a `sub-page` of the `current page` based on the `href`.

#### `.first()`

Returns the first `page` or `file`.

#### `.hasView()`

Does the current page have a custom view?

#### `.images()`

Images of the current page.

#### `.isActive()`

Is the current page active? Returns boolean.

#### `.last()`

Returns the last `page` or `file`.

#### `.page()`

The current page.

#### `.pages()`

Sub-pages of the current page.

#### `.parent()`

The parent of the current page.

#### `.sort()`

Sorts the current value’s `.pages` by `.order`. Formatting of `.order` follows the arguments of `.sortBy` separated by a space. For example, `date asc`.

#### `.sortBy(key, order)`

Sort the `files` or `pages` based by a certain key. Order can be either `asc` or `desc`. For example, `.sortBy('name', 'desc')` or  `.sortBy('date', 'asc')`.

#### `.toArray()`

Converts the values of an object to an array.

#### `.v()`

Alias for `.value()`.

#### `.value()`

Return the current value. Not chainable.

#### `.visible()`

Returns if the current value key `visible` is not `false`.
</details>
