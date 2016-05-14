# React.Router.Pagination
React Router Pagination

A React Router pagination component.

The component has two optional props:

1. An ```onClick``` handler, for when a user clicks the link to a page.
2. A ```path``` parameter, for generating that link. Presently it is used to prefix the page number and defaults to "/".

The component has two required props:

1. A ```totalPages``` integer.
1. A ```pageNumber``` integer.

The component converts strings to numbers using ```parseInt()``` but does not check for errors. Instead, there's utility object exported by the class with methods for making the calculations and producing those numbers for you:

```
const totalPages = pagination.calculateTotalPages(120, 10)
const pageNumber = pagination.calculatePageNumber(4, totalPages)
```

The method ```calculateTotalPages()``` ensures that a collection with 120 total items at 10 items per page has 12 page links, but 121 items at the same page size has 13.  

The method ```calculatePageNumber()``` constrains the return value. If you pass 4 but ```totalPages``` is 3 then it will return 3. Alternatively, if you pass a string it will return 1.  

In addition, there are two configuration props:

1. ```spread```
2. ```format```

The value for ```spread``` should be an integer. It's the maximum number of page links to be displayed together. 

For example, if ```totalPages``` is 12, ```pageNumber``` is 4, and ```spread``` is 5, then links to pages 1, 2, 3, 4 and 5 will be displayed (as well as a "forward" link to page 6 and a link to the last page, 12).

Pass the ```format``` prop a value of "center" and a different calculation is used for the page links. You might prefer to try that one out than read about it. But it give it some good, solid numbers: lots of pages, with a spread of 5.
