import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/CRUD');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("DB connected");// we're connected!
});

export default db;
