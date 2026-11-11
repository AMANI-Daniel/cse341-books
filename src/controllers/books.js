
import e from 'express';
import { getAllBooks, getBookById } from '../models/books.js';

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

export { getBooksHandler, getBookByIdHandler };