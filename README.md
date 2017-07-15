# React.Router.Pagination
React Router Pagination

A React Router pagination component.

[Example implementations are available on GitHub.](https://github.com/sequencemedia/React.Router.Pagination.IO)

The component has two optional props:

1. An `onClick` handler, for when a user clicks the link to a page.
2. A `path` parameter, for generating that link. Presently it is used to prefix the page number and defaults to "/".

The component has two required props:

1. A `totalPages` integer.
1. A `pageNumber` integer.

The component converts string values to numbers using `parseInt()` but does not check for errors. There are static methods on the class to make the calculations and produce those numbers for you:

```
const totalPages = Pagination.calculateTotalPages(120, 10)
const pageNumber = Pagination.calculatePageNumber(4, totalPages)
```

The method `calculateTotalPages()` ensures that a collection with 120 total items at 10 items per page has 12 page links, but 121 items at the same page size has 13.

The method `calculatePageNumber()` constrains the return value: 

1. If you pass 4 but `totalPages` is 3 then it will return 3.
2. If you pass a string and it cannot be parsed to a number it will return 1.

In addition, there are two configuration props:

1. `spread`
2. `format`

The value for `spread` should be an integer. It's the maximum number of page links to be displayed together.

If `totalPages` is 12, `pageNumber` is 1, and `spread` is 5, then links to pages 1, 2, 3, 4 and 5 will be displayed (as well as a "forward" link to page 6 and a link to the last page, 12).

Class names indicate the `currentPage`, the `forwardPage`, and the `lastPage`.

```
    <ul class="pagination">
        <li class="currentPage">
            <a href="/1">
                <span class="pageNumber">1</span>
            </a>
        </li>
        <li>
            <a href="/2">
                <span class="pageNumber">2</span>
            </a>
        </li>
        <li>
            <a href="/3">
                <span class="pageNumber">3</span>
            </a>
        </li>
        <li>
            <a href="/4">
                <span class="pageNumber">4</span>
            </a>
        </li>
        <li>
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

```
    <ul class="pagination">
        <li class="zeroPage">
            <a href="/1">
                <span class="pageNumber">1</span>
            </a>
        </li>
        <li>
            <a href="/2">
                <span class="pageNumber">2</span>
            </a>
        </li>
        <li>
            <a href="/3">
                <span class="pageNumber">3</span>
            </a>
        </li>
        <li class="currentPage">
            <a href="/4">
                <span class="pageNumber">4</span>
            </a>
        </li>
        <li>
            <a href="/5">
                <span class="pageNumber">5</span>
            </a>
        </li>
        <li>
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

```
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
        <li>
            <a href="/6">
                <span class="pageNumber">6</span>
            </a>
        </li>
        <li>
            <a href="/7">
                <span class="pageNumber">7</span>
            </a>
        </li>
        <li class="currentPage">
            <a href="/8">
                <span class="pageNumber">8</span>
            </a>
        </li>
        <li>
            <a href="/9">
                <span class="pageNumber">9</span>
            </a>
        </li>
        <li>
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

Pass the `format` prop a value of "center" and a different calculation is used for the page links. You might prefer to try that one out than read about it. But it give it some good, solid numbers: lots of pages, with a spread of 5.
