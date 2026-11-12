import { getDb } from "../db/connect.js";

const getAllBooks = async () => { 

    const db = getDb();
    const collection = db.collection('books');
    const books = await collection.find({}).toArray();
    return  books;

}

const getBookById = async (bookId) => {
    const db = getDb();
    const collection = db.collection('books');
    const book = await collection.findOne({ id: bookId });
    return book;
}

//function to create a new book
const createBook = async (book) => {
    const db = getDb();
    const collection = db.collection('books');
    await collection.insertOne(book);
    return book;
};

//function to update a book by id
const updateBook = async (bookId, updatedBook) => {
    const db = getDb();
    const collection = db.collection('books');
    const result = await collection.updateOne({ id: bookId }, { $set: updatedBook });
    return { id: bookId, ...updatedBook };
}

//function to delete a book by id
const deleteBook = async (bookId) => {
    const db = getDb();
    const collection = db.collection('books');
    const result = await collection.deleteOne({ id: bookId });
    return result;
}

//Helper function to check if the authorId exists in the authors collection
const checkAuthorExists = async (authorId) => {
    const db = getDb(); 
    const collection = db.collection('authors');
    const count = await collection.countDocuments({ id: authorId });
    return count > 0;
}

export { getAllBooks, getBookById, createBook, updateBook, deleteBook, checkAuthorExists };
