<h1 align="center">nanopage</h1>

A super easy way of traversing flat content state. Pairs nicely with [`nanocontent`](https://github.com/jondashkyle/nanocontent).

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
      url: '/'
    },
    '/example': {
      title: 'Example',
      text: 'Scope it out',
      url: '/example'
    },
    '/image.jpg': {
      filename: 'image.jpg',
      extension: 'jpg',
      type: 'image',
      url: '/content/image.jpg'
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

Want to transform a directory of files and folders into flat content state? Try [Nanocontent](https://github.com/jondashkyle/nanocontent)! Super handy to use with [Enoki](https://github.com/enokidotsite/enoki) and [Choo](https://github.com/choojs/choo) and the provided [plugin](#choo).

## Philosophy

State is really handy. Especially global state. We ended up with state when webapps started to get really complex and we needed all of the interface to stay in sync with new data and minimize the amount of updates happening to the DOM.

After a while, we started using state for sites too. That is, sites that look more like sites and less like apps. Mostly because state is super handy. However, state can get really messy as sites get larger. Where do you store data? How do you reference it? If you have ten nested pages, do you have ten nested objects?

Instead of all of this complexity, lets reintroduce the URL. Each page url of your site is a key in a flat object. We can simply use the `window.location` to grab the data/content for the current page. Or, we can use any arbitrary url, like `/foo/bar`.

This way of organizing state for sites as a flat object of page urls makes it super trivial to access content in your views and pass it down into components, or whatever. Ok cool!

## Files

Nanopage provides utilities for files via `file()` addition to `page()`.

```js
var File = require('nanopage/file')

var state = {
  '/': {
    title: 'Index',
    url: '/'
  },
  '/example.jpg': {
    title: 'Example',
    filename: 'example.jpg',
    extension: 'jpg',
    url: '/content/example.jpg'
  }
}

// instantiate the file
var file = new File(state)

// grab some metadata
var example = file('/example.jpg').value()
```

## Choo

Using Choo? Try the plugin!

```js
var html = require('choo/html')
var choo = require('choo')
var app = choo()

app.use(require('nanopage/choo'))

app.route('*', function (state, emit) {
  return html`
    <body>
      <h1>${state.page().value('title')}</h1>
      <img src="${state.file('/about/example.jpg').url()}">
    </body>
  `
})

if (module.parent) module.exports = app
else app.mount('body')
```

## Global utilities

These utilities work for both `page()` and `file()`

#### `.first()`

Returns the first `page` or `file`.

#### `.isActive()`

Is the current value active? Returns boolean.

#### `.isFile()`

Is the current value a file? Returns boolean.

#### `.isPage()`

Is the current value a page? Returns boolean.

#### `.last()`

Returns the last `page` or `file`.

#### `.parent()`

The parent of the current page.

#### `.toArray()`

Converts the values of an object to an array.

#### `.v()`

Alias for `.value()`.

#### `.value()`

Return the current value. Not chainable.

#### `.visible()`

Returns if the current value key `visible` is not `false`.

## Page utilities

#### `.children()`

Alias for `.pages()`.

#### `.file(filename)`

Locate a child file of the current page based on the `url`.

#### `.files()`

Child files of the current `page`.

#### `.find(url)`

Locate a child page of the current page based on the `url`.

#### `.hasView()`

Does the current page have a custom view?

#### `.images()`

Child images of the current page.

#### `.pages()`

Child pages of the current page.

#### `.shuffle()`

Shuffle values of an array.

#### `.sortBy(key, order)`

Sort the `files` or `pages` based by a certain key. Order can be either `asc` or `desc`. For example, `.sortBy('name', 'desc')` or  `.sortBy('date', 'asc')`.

## File utilities