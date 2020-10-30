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
});