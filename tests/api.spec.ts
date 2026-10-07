import { test, expect, request } from '@playwright/test';

test('GET users returns 200', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users');

  expect(response.status()).toBe(200);
  const data = await response.json();

expect(Array.isArray(data)).toBe(true);
expect(data.length).toBeGreaterThan(0);
expect(data[0]).toHaveProperty('username');

});
test('POST user returns 201', async ({ request }) => {
  const response = await request.post(
    'https://jsonplaceholder.typicode.com/users',
    {
      data: {
        name: 'Dimitris',
        username: 'dimitris22'
      }
    }
  );
  
  expect(response.status()).toBe(201);

  const data = await response.json();

  expect(data.name).toBe('Dimitris');
  expect(data.username).toBe('dimitris22');
});
test('PATCH user updates username', async ({ request }) => {
  const response = await request.patch(
    'https://jsonplaceholder.typicode.com/users/1',
    {
      data: {
        username: 'new_username'
      }
    }
  );

  expect(response.status()).toBe(200);

  const data = await response.json();

  expect(data.username).toBe('new_username');
});
//npx.cmd playwright test tests/api.spec.ts --project=chromium
test('DELETE user returns 200', async ({ request }) => {
  const response = await request.delete(
    'https://jsonplaceholder.typicode.com/users/1'
  );

  expect(response.status()).toBe(200);
});
test('GET non-existing user returns 404', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/users/999999'
  );

  expect(response.status()).toBe(404);
});
test('GET user2 returns 200', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/users/2'
  );

  expect(response.status()).toBe(200);

  const data = await response.json();

  expect(data.id).toBe(2);
  expect(data).toHaveProperty('username');
});
test('GET user3  returns 200', async({request})=>{
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/users/3'
  );
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data.id).toBe(3);
  expect(data).toHaveProperty('email');
  expect(data.username).not.toBe('');

}
);
test('POST giorgos user returns 201',async({request})=>{
  const response = await request.post(
    'https://jsonplaceholder.typicode.com/users',{
      data:{
        name: 'Giorgos',
        username: 'giorgos99'
      }
      
    }
  );
  expect(response.status()).toBe(201);
  const data = await response.json();
  expect(data.name).toBe('Giorgos');
  expect(data.username).toBe('giorgos99');


}
);
test('PATCH user3 returns 200',async({request}) =>{
  const response = await request.patch(
    'https://jsonplaceholder.typicode.com/users/3',{
      data:{
        username: 'update_user'

      }
    }

  );
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data.username).toBe('update_user');

}
);
test('DELETE user 3 returns 200',async({request})=>{
  const response = await request.delete(
    'https://jsonplaceholder.typicode.com/users/3',

  );
    expect(response.status()).toBe(200);
  });
