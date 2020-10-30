const request = require('supertest');
const { Book } = require('../../models/books');
const { User } = require('../../models/user');
const mongoose = require('mongoose');

let server;

describe('/api/books', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(async () => {
        server.close();
        await Book.remove({});
    });

    describe('GET /', () => {
        it('should return all books', async () => {
            const books = [
                { name: 'book1' },
                { name: 'book2' },
            ];

            await Book.collection.insertMany(books);

            const res = await request(server).get('/api/books');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'book1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'book2')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('should return a book if valid id is passed', async () => {
            const book = new Book({ name: 'book1' });
            await book.save();

            const res = await request(server).get('/api/books/' + book._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', book.name);
        });

        it('should return 404 if invalid id is passed', async () => {
            const res = await request(server).get('/api/books/1');

            expect(res.status).toBe(404);
        });

        it('should return 404 if no book with the given id exists', async () => {
            const id = mongoose.Types.ObjectId();
            const res = await request(server).get('/api/books/' + id);

            expect(res.status).toBe(404);
        });
    });

    describe('POST /', () => {
        let token;
        let name;

        const exec = async () => {
            return await request(server)
                .post('/api/books')
                .set('x-auth-token', token)
                .send({ name });
        }

        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'book1';
        })

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 400 if book is less than 5 characters', async () => {
            name = '1234';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if book is more than 50 characters', async () => {
            name = new Array(52).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should save the book if it is valid', async () => {
            await exec();

            const book = await Book.find({ name: 'book1' });

            expect(book).not.toBeNull();
        });

        it('should return the book if it is valid', async () => {
            const res = await exec();

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'book1');
        });
    });

    describe('PUT /:id', () => {
        let token;
        let newName;
        let book;
        let id;

        const exec = async () => {
            return await request(server)
                .put('/api/books/' + id)
                .set('x-auth-token', token)
                .send({ name: newName });
        }

        beforeEach(async () => {
            book = new Book({ name: 'book1' });
            await book.save();

            token = new User().generateAuthToken();
            id = book._id;
            newName = 'updatedName';
        })

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 400 if book is less than 5 characters', async () => {
            newName = '1234';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if book is more than 50 characters', async () => {
            newName = new Array(52).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 404 if id is invalid', async () => {
            id = 1;

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return 404 if book with the given id was not found', async () => {
            id = mongoose.Types.ObjectId();

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should update the book if input is valid', async () => {
            await exec();

            const updatedBook = await Book.findById(book._id);

            expect(updatedBook.name).toBe(newName);
        });

        it('should return the updated book if it is valid', async () => {
            const res = await exec();

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', newName);
        });
    });

    describe('DELETE /:id', () => {
        let token;
        let book;
        let id;

        const exec = async () => {
            return await request(server)
                .delete('/api/books/' + id)
                .set('x-auth-token', token)
                .send();
        }

        beforeEach(async () => {
            book = new Book({ name: 'book1' });
            await book.save();

            id = book._id;
            token = new User({ isAdmin: true }).generateAuthToken();
        })

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 403 if the user is not an admin', async () => {
            token = new User({ isAdmin: false }).generateAuthToken();

            const res = await exec();

            expect(res.status).toBe(403);
        });

        it('should return 404 if id is invalid', async () => {
            id = 1;

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return 404 if no book with the given id was found', async () => {
            id = mongoose.Types.ObjectId();

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should delete the book if input is valid', async () => {
            await exec();

            const bookInDb = await Book.findById(id);

            expect(bookInDb).toBeNull();
        });

        it('should return the removed book', async () => {
            const res = await exec();

            expect(res.body).toHaveProperty('_id', book._id.toHexString());
            expect(res.body).toHaveProperty('name', book.name);
        });
    });
});