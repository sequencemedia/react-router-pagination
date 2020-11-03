# react-router-pagination

## React Router Pagination

A *React Router 5* pagination component.

- You have lots of data?
- You want users to page through that data?
- You want the page to be reflected in the route, and you're using *React Router*?

Given some simple props, *React Router Pagination* will create a list of links to those pages.

[Example implementations are available on GitHub.](https://github.com/sequencemedia/react-router-pagination-io) You can also [clone this repository](https://github.com/sequencemedia/react-router-pagination) and run Storybook.

### Using the component

Required props:

- A `totalPages` integer.

Not quite required but not quite optional props:

- A `pageNumber` integer.

Optional props:

1. A `match` object, for generating the `to` prop of each `<Link />` component.
2. An `onClick` handler, for when the user clicks a `<Link />`.

Additional props:

1. `spread`
2. `format`

### Example

A component with props:

```jsx
<Pagination
  totalPages={12}
  pageNumber={1}
/>
```
Generates:

```html
<ul class="pagination">
    <li class="currentPage">
        <a href="/1">
            <span class="pageNumber">1</span>
        </a>
    </li>
    <li class="page">
        <a href="/2">
            <span class="pageNumber">2</span>
        </a>
    </li>
    <li class="page">
       <a href="/3">
           <span class="pageNumber">3</span>
       </a>
    </li>
    <li class="page">
        <a href="/4">
            <span class="pageNumber">4</span>
        </a>
    </li>
    <li class="page">
        <a href="/5">
           <span class="pageNumber">5</span>
        </a>
    </li>
    <li class="forwardPage">
        <a href="/6">
            <span class="forwardPage">»</span>
        </a>
    </li>
    <li class="lastPage">
        <a href="/12">
            <span class="pageNumber">12</span>
        </a>
    </li>
</ul>
```

(The default `match` object creates default route paths. You probably don't want that.)

### About `totalPages`

*React Router Pagination* doesn't care about how many items you have and how many items you want to show per page.

It only cares about the _total number of pages_.

- Your data contains 120 items which you want to display at 10 items per page.
- Your data contains 60 items which you want to display at 5 items per page.
- Your data contains 240 items which you want to display at 20 items per page.

In which case, `totalPages` should be 12.

```jsx
<Pagination
  totalPages={12}
/>
```

- Your data contains 121 items which you want to display at 10 items per page.
- Your data contains 61 items which you want to display at 5 items per page.
- Your data contains 241 items which you want to display at 20 items per page.

In which case, `totalPages` should be 13.

```jsx
<Pagination
  totalPages={13}
/>
```

(Strings are coerced to numbers, and numbers are rounded.)

*React Router Pagination* only _requires_ the _total number of pages_, which could be computed anywhere in your application ...

... But it does expose a static function for computing the `totalPages`:

```javascript
const totalPages = Pagination.calculateTotalPages(120, 10)
```

Or:

```javascript
const totalPages = Pagination.calculateTotalPages(121, 10)
```
(This is the same function the component uses internally.)

You can use this function anywhere in your application to ensure that the same value is being presented in different components.

### About `pageNumber`

- Your data contains 120 items which you want to display at 10 items per page.

To display page 1:

```jsx
<Pagination
  totalPages={12}
  pageNumber={1}
/>
```

To display page 5:

```jsx
<Pagination
  totalPages={12}
  pageNumber={5}
/>
```

(Strings are coerced to numbers, and numbers are rounded.)

*React Router Pagination* constrains `pageNumber` to a min of 1 and a max of `totalPages`.

Any of these will present page 1:

```jsx
<Pagination
  totalPages={12}
  pageNumber={1}
/>
```
```jsx
<Pagination
  totalPages={12}
/>
```
```jsx
<Pagination
  totalPages={12}
  pageNumber={0}
/>
```

Either these will present page 12:

```jsx
<Pagination
  totalPages={12}
  pageNumber={12}
/>
```
```jsx
<Pagination
  totalPages={12}
  pageNumber={13}
/>
```

(Strings are coerced to numbers, and numbers are rounded.)

... *React Router Pagination* exposes a static function for computing the `pageNumber` prop:

```javascript
const pageNumber = Pagination.calculatePageNumber(0, 12)
```

Or:

```javascript
const pageNumber = Pagination.calculatePageNumber(13, 12)
```

Again, you can use this function anywhere in your application to ensure that the same value is being presented in different components.

### Creating page routes with the `match` prop

The `match` prop has the same structure as *React Router* `match` prop.

The default has this structure:

```javascript
{
  path: '/:pageNumber',
  params: {
    pageNumber: 1 /* or any integer */
  }
}
```

But your `path` is more complex. You have a `<Route />` component matching the pattern:

```
/catalogue/products/:id
```

And you have a number of stores selling that product, for which you have a `<Route />` component matching the pattern:

```
/catalogue/products/:id/stores/:pageNumber
```

Let's say the store `id` is `ABCDEF`.

For the list of stores, supply the `Pagination` component  with a `match` prop of this structure:

```javascript
{
  path: '/catalogue/products/:id/stores/:pageNumber',
  params: {
    id: 'ABCDEF'
  }
}
```

*React Router Pagination* uses the *React Router* utility `generatePath` to compute paths:

```javascript
const getLinkTo = ({ path, params }, pageNumber) => generatePath(path, { ...params, pageNumber })
```

Given a `totalPages` of 12 and a `spread` of 5 then *React Router Pagination* will create a list of `<Link />` components:

```html
<ul class="pagination">
    <li class="currentPage">
        <a href="/catalogue/products/ABCDEF/stores/1">
            <span class="pageNumber">1</span>
        </a>
    </li>
    <li class="page">
        <a href="/catalogue/products/ABCDEF/stores/2">
            <span class="pageNumber">2</span>
        </a>
    </li>
    <li class="page">
       <a href="/catalogue/products/ABCDEF/stores/3">
           <span class="pageNumber">3</span>
       </a>
    </li>
    <li class="page">
        <a href="/catalogue/products/ABCDEF/stores/4">
            <span class="pageNumber">4</span>
        </a>
    </li>
    <li class="page">
        <a href="/catalogue/products/ABCDEF/stores/5">
           <span class="pageNumber">5</span>
        </a>
    </li>
    <li class="forwardPage">
        <a href="/catalogue/products/ABCDEF/stores/6">
            <span class="forwardPage">»</span>
        </a>
    </li>
    <li class="lastPage">
        <a href="/catalogue/products/ABCDEF/stores/12">
            <span class="pageNumber">12</span>
        </a>
    </li>
</ul>
```

What's `spread`?

### Additional props, etc

1. `spread`
2. `format`

The value for `spread` should be an integer. It's the maximum number of page links to be displayed together.

#### Spread

If `totalPages` is 12, `pageNumber` is 1, and `spread` is 5, then links to pages 1, 2, 3, 4 and 5 will be displayed (as well as a "forward" link to page 6 and a link to the last page, 12).

Class names indicate the `currentPage`, the `forwardPage`, and the `lastPage`.

```html
<ul class="pagination">
    <li class="currentPage">
        <a href="/1">
            <span class="pageNumber">1</span>
        </a>
    </li>
    <li class="page">
        <a href="/2">
            <span class="pageNumber">2</span>
        </a>
    </li>
    <li class="page">
        <a href="/3">
            <span class="pageNumber">3</span>
        </a>
    </li>
    <li class="page">
        <a href="/4">
            <span class="pageNumber">4</span>
        </a>
    </li>
    <li class="page">
        <a href="/5">
            <span class="pageNumber">5</span>
        </a>
    </li>
    <li class="forwardPage">
        <a href="/6">
            <span class="forwardPage">»</span>
        </a>
    </li>
    <li class="lastPage">
        <a href="/12">
            <span class="pageNumber">12</span>
        </a>
    </li>
</ul>
```

If `totalPages` is 12, `pageNumber` is 4, and `spread` is 5, then links to pages 1, 2, 3, 4 and 5 will be displayed (as well as a "forward" link to page 6 and a link to the last page, 12).

Class names indicate the `zeroPage`, the `currentPage`, the `forwardPage`, and the `lastPage`.

```html
<ul class="pagination">
    <li class="zeroPage">
        <a href="/1">
            <span class="pageNumber">1</span>
        </a>
    </li>
    <li class="page">
        <a href="/2">
            <span class="pageNumber">2</span>
        </a>
    </li>
    <li class="page">
        <a href="/3">
            <span class="pageNumber">3</span>
        </a>
    </li>
    <li class="currentPage">
        <a href="/4">
            <span class="pageNumber">4</span>
        </a>
    </li>
    <li class="page">
        <a href="/5">
            <span class="pageNumber">5</span>
        </a>
    </li>
    <li class="page">
        <a href="/6">
            <span class="pageNumber">6</span>
        </a>
    </li>
    <li class="forwardPage">
        <a href="/7">
            <span class="forwardPage">»</span>
        </a>
    </li>
    <li class="lastPage">
        <a href="/12">
            <span class="pageNumber">12</span>
        </a>
    </li>
</ul>
```

If `totalPages` is 12, `pageNumber` is 8, and `spread` is 5, then links to pages 6, 7, 8, 9, and 10 will be displayed (as well as a "reverse" link to page 5, a "forward" link to page 11 and a link to the first page, 1, and the last page, 12).

Class names indicate the `zeroPage`, the `reversePage`, the `currentPage`, the `forwardPage`, and the `lastPage`.

```html
<ul class="pagination">
    <li class="zeroPage">
        <a href="/1">
            <span class="pageNumber">1</span>
        </a>
    </li>
    <li class="reversePage">
        <a href="/5">
            <span class="reverse">«</span>
        </a>
    </li>
    <li class="page">
        <a href="/6">
            <span class="pageNumber">6</span>
        </a>
    </li>
    <li class="page">
        <a href="/7">
            <span class="pageNumber">7</span>
        </a>
    </li>
    <li class="currentPage">
        <a href="/8">
            <span class="pageNumber">8</span>
        </a>
    </li>
    <li class="page">
        <a href="/9">
            <span class="pageNumber">9</span>
        </a>
    </li>
    <li class="page">
        <a href="/10">
            <span class="pageNumber">10</span>
        </a>
    </li>
    <li class="forwardPage">
        <a href="/11">
            <span class="forwardPage">»</span>
        </a>
    </li>
    <li class="lastPage">
        <a href="/12">
            <span class="pageNumber">12</span>
        </a>
    </li>
</ul>
```

### Format

Pass the `format` prop a value of "center" and a different calculation is used for the page links. You might prefer to try that one out than read about it. But it give it some good, solid numbers: lots of pages, with a spread of 5.
