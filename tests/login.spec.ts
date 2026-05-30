import { test, expect } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('JSONPlaceholder API', () => {

    test('GET post by ID returns 200', async ({request}) => {
    const response = await request.get(BASE_URL + '/posts/1');
    expect(response.status()).toBe(200);
    const body  = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.id).toEqual(1);
        expect(body.title).toBeTruthy();  // has a title
        expect(body.userId).toBeTruthy(); // has a userId
    })

    test('GET post by ID returns 404', async ({request}) => {
        const response = await request.get(BASE_URL + '/posts/999');
        expect(response.status()).toBe(404);
        const body = await response.json();
        // expect(body).toHaveProperty('id');
    })

    test('POST post by ID returns 201', async ({request}) => {
        const response = await request.post(BASE_URL + '/posts',{ data: { title: '...', body: '...', userId: 1 } });
        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body).toHaveProperty('id');
    })

    test('Delete post by ID returns 200', async ({request}) => {
        const response = await request.delete(BASE_URL + '/posts/1');
        expect(response.status()).toBe(200);
        const body = await response.json();
        // expect(body).toHaveProperty('id');
    })
});

