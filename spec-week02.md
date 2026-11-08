# Books API Week 02 Spec - Version 1

## Feature 1: Book CRUD Operations and Author References

### Goal
Update the existing Week 01 book API so book documents include a reference to an author and the API supports all CRUD operations for books. Every book route must be documented and testable in Swagger.

### Data Model
Book documents will be stored in the `books` collection.

Required book fields:
- `id`: string, required, custom id such as `b1`
- `authorId`: string, required, references the `id` field of an author document
- `title`: string, required
- `publicationDate`: string, required

Books will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Authors
Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

### Routes

#### GET /books
Purpose: Return all books.

Success:
- Status code: `200`
- Response body: an array of book objects

Errors:
- `500` if an unexpected server or database error occurs

#### GET /books/:id
Purpose: Return one book by its custom id.

Success:
- Status code: `200`
- Response body: the matching book object

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### POST /books
Purpose: Create a new book.

Request body:

    {
      "id": "b4",
      "authorId": "a1",
      "title": "Example Book Title",
      "publicationDate": "2026-01-15"
    }

Success:
- Status code: `201`
- Response body: the newly created book object

Errors:
- `400` if a required field is missing
- `400` if the `id` already exists
- `400` if the `authorId` does not match an existing author
- `500` if an unexpected server or database error occurs

#### PUT /books/:id
Purpose: Update an existing book.

Request body:

    {
      "authorId": "a2",
      "title": "Updated Book Title",
      "publicationDate": "2026-02-20"
    }

Success:
- Status code: `200`
- Response body: the updated book object

Errors:
- `400` if a required field is missing
- `400` if the `authorId` does not match an existing author
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### DELETE /books/:id
Purpose: Delete an existing book.

Success:
- Status code: `204`
- Response body: none

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

### Swagger Documentation
Swagger must document every book route.

### Deployment Expectations
After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.

## Feature 2: Author CRUD Operations

TODO: Follow the example above to complete a spec for the authors feature.

### Goal
Add an author collection that stores author ids, names, and birth years and the API must support all CRUD operations. Every author route must be documented and tested in swagger.

### Data model
Author documents will be stored in the `authors` collection.
Required author field:

-`id`: string and must be unique (required)
-`names`: string (required)
-`birthYear`: string valid four digit (required)
### Relationship with books
Each author must have unique id that will be referenced by books through authorId.
When deleting the author, the API should reject with a `400` status code if the `id` is referenced by at least one book.
### Routes

#### GET /authors
Purpose: Return all authors.

Success:
- Status code: `200`
- Response body: an array of author objects

Errors:
- `500` if an unexpected server or database error occurs

#### GET /authors/:id
Purpose: Return one author by its custom id.

Success:
- Status code: `200`
- Response body: the matching author object

Errors:
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

#### POST /authors
Purpose: Create a new author.

Request body:

    {
      "id": "a1",
      "names": "AMANI Daniel",
      "birthYear": "2005"
    }

Success:
- Status code: `201`
- Response body: the newly created author object

Errors:
- `400` if a required field is missing
- `400` if the `id` already exists
- `500` if an unexpected server or database error occurs

#### PUT /authors/:id
Purpose: Update an existing author.

Request body:

    {
        "names": "Uwabagira Rose",
     	"birthYear": "2006"
    }

Success:
- Status code: `200`
- Response body: the updated author object

Errors:
- `400` if a required field is missing
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

#### DELETE /authors/:id
Purpose: Delete an existing author.

Success:
- Status code: `204`
- Response body: none

Errors:
- `404` if no author exists with that id
- `400` if the author is referenced by at least on book.
- `500` if an unexpected server or database error occurs

### Swagger Documentation
Swagger must document every author route.

### Deployment Expectations
After implementation, the author routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every author route from the browser.


==================================================================================================

# Books API Week 02 Spec - Version 2

## Feature 1: Book CRUD Operations and Author References

### Goal
Update the existing Week 01 book API so book documents include a reference to an author and the API supports all CRUD operations for books. Every book route must be documented and testable in Swagger.

### Data Model
Book documents will be stored in the `books` collection.

Required book fields:
- `id`: string, required, custom unique id such as `b1`
- `authorId`: string, required, references the `id` field of an author document.
- `title`: string, required
- `publicationDate`: string in ISO 8601 date format (for example, "2021-08-17") (required)

Books will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Authors
Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

### Routes

#### GET /books
Purpose: Return all books.

Success:
- Status code: `200`
- Response body example: 
[
  {
    "id": "b1",
    "authorId": "a1",
    "title": "Patterns of Light",
    "publicationDate": "2021-08-17"
  }
]

Errors:
- `500` if an unexpected server or database error occurs

#### GET /books/:id
Purpose: Return one book by its custom id.

Success:
- Status code: `200`
- Response body example: 
{
  "id": "b1",
  "authorId": "a1",
  "title": "Patterns of Light",
  "publicationDate": "2021-08-17"
}
Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs
- Not found response body example:
{
  "message": "Book not found"
}
#### POST /books
Purpose: Create a new book.

Request body:

    {
      "id": "b4",
      "authorId": "a1",
      "title": "Example Book Title",
      "publicationDate": "2026-01-15"
    }

Success:
- Status code: `201`
- Response body example: 
{
  "id": "b1",
  "authorId": "a1",
  "title": "Patterns of Light",
  "publicationDate": "2021-08-17"
}

Errors:
- `400` if a required field is missing
- `400` if the `id` already exists
- `400` if the `authorId` does not match an existing author
- `500` if an unexpected server or database error occurs

#### PUT /books/:id
Purpose: Update an existing book.

Request body:

    {
      "authorId": "a2",
      "title": "Updated Book Title",
      "publicationDate": "2026-02-20"
    }

Success:
- Status code: `200`
- Response body example:
{
  "authorId": "a2",
  "title": "Patterns of Light",
  "publicationDate": "2021-01-03"
}

Errors:
- `400` if a required field is missing
- `400` if the `authorId` does not match an existing author
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

- Not found response body example:
{
  "message": "Book not found"
}

#### DELETE /books/:id
Purpose: Delete an existing book.

Success:
- Status code: `204`
- Response body: none

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

- Not found response body example:
{
  "message": "Book not found"
}

### Error Handling
- Do not return stack traces to clients.
- Return a simple message for 500 errors:
{
  "message": "Internal server error"
}

## Implementation Notes
- Use a MongoDB collection named `books`.
- Seed the collection with the book documents needed for testing.
- Use environment variables for the MongoDB connection.
- Do not hardcode database credentials or secrets in the source code or commit them to GitHub.

### Swagger Documentation
Swagger must document every book route.

### Deployment Expectations
After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.


## Feature 2: Author CRUD Operations

TODO: Follow the example above to complete a spec for the authors feature.

### Goal
Add an author collection that stores author ids, names, and birth years and the API must support all CRUD operations. Every author route must be documented and tested in swagger.

### Data model
Author documents will be stored in the `authors` collection.
Required author field:

-`id`: string and must be unique (required)
-`names`: string (required)
-`birthYear`: string valid four digit (required)
### Relationship with books
Each author must have unique id that will be referenced by books through authorId.
When deleting the author, the API should reject with a `400` status code if the `id` is referenced by at least one book.
### Routes

#### GET /authors
Purpose: Return all authors.

Success:
- Status code: `200`
- Response body example: 
[
  {
    "id": "a1",
    "names": "AMANI Daniel",
    "birthYear": "2005"
  }
]
Errors:
- `500` if an unexpected server or database error occurs

#### GET /authors/:id
Purpose: Return one author by its custom id.

Success:
- Status code: `200`
- Response body example: 
  {
    "id": "a1",
    "names": "AMANI Daniel",
    "birthYear": "2005"
  }
Errors:
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

- Not found response body example:
{
  "message": "Author not found"
}

#### POST /authors
Purpose: Create a new author.

Request body:

    {
      "id": "a1",
      "names": "AMANI Daniel",
      "birthYear": "2005"
    }

Success:
- Status code: `201`
- Response body example: 
    {
    "id": "a1",
    "names": "AMANI Daniel",
    "birthYear": "2005"
  }
Errors:
- `400` if a required field is missing
- `400` if the `id` already exists
- `500` if an unexpected server or database error occurs

#### PUT /authors/:id
Purpose: Update an existing author.

Request body:

    {
      "names": "Uwabagira Rose",
     	"birthYear": "2006"
    }

Success:
- Status code: `200`
- Response body example: 
   {
      "id": "a1",
      "names": "Uwabagira Rose",
     	"birthYear": "2006"
    }
Errors:
- `400` if a required field is missing
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

- Not found response body example:
{
  "message": "Author not found"
}

#### DELETE /authors/:id
Purpose: Delete an existing author.

Success:
- Status code: `204`
- Response body example: none

Errors:
- `404` if no author exists with that id
- `400` if the author is referenced by at least on book.
- `500` if an unexpected server or database error occurs

- Not found response body example:
{
  "message": "Author not found"
}

### Error Handling
- Do not return stack traces to clients.
- Return a simple message for 500 errors:
{
  "message": "Internal server error"
}

## Implementation Notes
- Use a MongoDB collection named `authors`.
- Seed the collection with the author documents needed for testing.
- Use environment variables for the MongoDB connection.
- Do not hardcode database credentials or secrets in the source code or commit them to GitHub.

### Swagger Documentation
Swagger must document every author route.

### Deployment Expectations
After implementation, the author routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every author route from the browser.