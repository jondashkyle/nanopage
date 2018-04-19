<h1 align="center">nanopage</h1>

`nanopage` is a super easy way of traversing content state. A few basic rules.

- End a query and return it’s value by calling `.value()`
- Every method is chainable (except `.value()`)
- Values can be reused in new queries by doing `page(oldQuery)`

### Examples

```js
var Page = require('nanopage')

function view (state, emit) {
  // instantiate the page
  var page = new Page(state)

  // directly access pages by their href
  var site = page('/').value()
  var about = page('/about').value()

  // grab children and files
  var children = page().children().sort('name', 'asc').value()
  var files = page().files().value()

  // create new queries from previous
  var first = page(children).first().value()
  var last = page(children).last().value()

  // access specific keys
  var lastTitle = page(last).value('title')
}
```

<details><summary><b>Complete Methods List</b></summary>

#### `.children()`

Remaps to `.pages()`.

#### `.file(filename)`

Grab an individual file.

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

Is the current page active?

#### `.last()`

Returns the last `page` or `file`.

#### `.page()`

The current page.

#### `.pages()`

Sub-pages of the current page.

#### `.parent()`

The parent of the current page.

#### `.sort()`

Sorts the current value’s `.pages` by `.order`. Formatting of `.order` follows the arguments of `.sortBy` seperated by a space. For example, `date asc`.

#### `.sortBy(key, order)`

Sort the `files` or `pages` based by a certain key. Order can be either `asc` or `desc`. For example, `.sortBy('name', 'desc')` or  `.sortBy('date', 'asc')`.

#### `.toArray()`

Converts the values of an object to an array.

#### `.value()`

Return the current value. Not chainable.

#### `.visible()`

Returns if the current value key `visible` is not `false`.
</details>
