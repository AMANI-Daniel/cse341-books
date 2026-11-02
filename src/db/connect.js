import { MongoClient } from 'mongodb';

let database;

// functions to connect to MongoDB and retrieve the database object

const connectToDb = async () => {
    const connectionString = process.env.MONGODB_URI;
    if (!connectionString) {
        throw new Error('MONGODB_URI is required.');
    }

    const client = new MongoClient(connectionString);
    await client.connect();
    database = client.db(process.env.MONGODB_DB_NAME || 'practice');
    return database;
};

//Provides access to the database after the connection has been established

const getDb = () => {
    if (!database) {
        throw new Error('Database not initialized. Call connectToDb first.');
    }
    return database;
};

export { connectToDb, getDb };