
import e from 'express';
import { 
    getAllBooks, 
    getBookById, 
    createBook as createBookInDb,
    updateBook as updateBookInDb,
    deleteBook as deleteBookFromDb,
    checkAuthorExists
} from '../models/books.js';

//Handler for GET /books
const getBooksHandler = async (req, res) => {
    try {
        const books = await getAllBooks();
        return res.status(200).json(books);
    } catch (error) {
        console.error('GET /books failed:', error.message);
        return res.status(500).json({ message: 'Unable to retrieve books' });
    }
};
//Handler for GET /books/:id
const getBookByIdHandler = async (req, res) => {
    const requestedId = req.params.id;
    try {
        const book = await getBookById(requestedId);

        // If the book is not found, return a 404 status code with a message
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        // If the book is found, return it with a 200 status code
        return res.status(200).json(book);
    } catch (error) {
        console.error("GET /books/:id failed: ", error.message);
        return res.status(500).json({message: 'Unable to retrieve book' });
    }
 }

 //Handler for POST /books
const createBookHandler = async (req, res) => {
    try {
        const { id, title, authorId, publicationDate } = req.body;
        if(!id || !title || !authorId || publicationDate === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existingBook = await getBookById(id);
        if (existingBook) {
            return res.status(409).json({ message: 'Book with this ID already exists' });
        }
        if(!await checkAuthorExists(authorId)) {
            return res.status(400).json({ message: 'Author does not exist' });
        }
        const newBook = { id, title, authorId, publicationDate };
        const createdBook = await createBookInDb(newBook);
        return res.status(201).json(createdBook);
    } catch (error) {
        console.error("POST /books failed: ", error.message);
        return res.status(500).json({ message: 'Unable to create book' });
    }
 };

 const updateBookHandler = async (req, res) => {
    try {
        const bookId = req.params.id;
        const {title, authorId, publicationDate} = req.body;

        if(!title || !authorId || publicationDate === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if(!await checkAuthorExists(authorId)) {
            return res.status(400).json({ message: 'Author does not exist' });
        }

        const existingBook = await getBookById(bookId);
        if (!existingBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        const result = await updateBookInDb(bookId, {title, authorId, publicationDate});
        return res.status(200).json(result);
    } catch (error) {
        console.error("PUT /books/:id failed: ", error.message);
        return res.status(500).json({ message: 'Unable to update book' });
    }
};

const deleteBookHandler = async (req, res) => {
    try {
        const bookId = req.params.id; 
        const existingBook = await getBookById(bookId);
        if (!existingBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        await deleteBookFromDb(bookId);
        return res.status(204).send();
    } catch (error) {
        console.error("DELETE /books/:id failed: ", error.message);
        return res.status(500).json({ message: 'Unable to delete book' });
    }
};

export { getBooksHandler, getBookByIdHandler, createBookHandler, updateBookHandler, deleteBookHandler }; 
