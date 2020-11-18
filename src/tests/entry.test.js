import request from 'supertest';

import app from '../app';
import utils from './utils';

describe('Authenticated User should be able to create an entry', () => {
  it('Should be able to create a diary entry at "/api/v1/entries" if all required input fields are valid', async () => {
    const { status, body: { data } } = await request(app).post('/api/v1/entries')
      .set('token', utils.user.mock2.token).send(utils.entry.mock);
    expect(status).toBeNumber().toEqual(201);
    expect(data).toBeObject().toContainKeys(['entry', 'status']);
    expect(data.status).toBeNumber().toEqual(201);
    expect(data.entry.title).toBeString().toEqual(utils.entry.mock.title);
    expect(data.entry.body).toBeString().toEqual(utils.entry.mock.body);
    expect(data.entry.id).toBeString();
    expect(data.entry.UserId).toBeString();
    expect(data.entry.createdAt).toBeString();
    expect(data.entry.updatedAt).toBeString();
  });

  it('Should not create an entry at "/api/v1/entries" if input fields are invalid', async () => {
    const { status, body: { error } } = await request(app).post('/api/v1/entries')
      .set('token', utils.user.mock2.token);
    expect(status).toBeNumber().toEqual(400);
    expect(error.messages).toBeArray().toIncludeAllMembers([
      {
        msg: 'Entry title should be at most 256 characters long',
        param: 'title',
        location: 'body',
      },
      {
        msg: 'Entry title must be string data type',
        param: 'title',
        location: 'body',
      },
      {
        msg: 'Entry title is required',
        param: 'title',
        location: 'body',
      },
      {
        msg: 'Entry body should be at least 1 character long',
        param: 'body',
        location: 'body',
      },
      {
        msg: 'Entry body must be string data type',
        param: 'body',
        location: 'body',
      },
      {
        msg: 'Entry body is required',
        param: 'body',
        location: 'body',
      },
    ]);
  });

  it('Should not create an entry at "/api/v1/entries" if token is falsy', async () => {
    const { status, body: { error } } = await request(app).post('/api/v1/entries')
      .send(utils.entry.mock);
    expect(status).toBeNumber().toEqual(400);
    expect(error.messages).toBeArray().toIncludeAllMembers([
      {
        msg: 'Token must be string data type',
        param: 'token',
        location: 'headers',
      },
      {
        msg: 'Token does not match Json Web Token format',
        param: 'token',
        location: 'headers',
      },
      {
        msg: 'Token is required',
        param: 'token',
        location: 'headers',
      },
    ]);
  });

  it('Should NOT create an entry at at "/api/v1/entries" if User is not authenticated', async () => {
    const { status, body: { error } } = await request(app).post('/api/v1/entries')
      .set('token', utils.user.mock2.token401).send(utils.entry.mock);
    expect(status).toBeNumber().toEqual(401);
    expect(error).toBeObject().toContainKeys(['message', 'status']);
    expect(error.message).toBeString().toEqual('User not found, please sign up by creating an account');
  });
});

describe('Authenticated User should be able to get all associated entries', () => {
  it('Should get all associated entries at "/api/v1/entries" if input all required fields are valid', async () => {
    const { status, body: { data } } = await request(app).get('/api/v1/entries')
      .set('token', utils.user.mock2.token);
    expect(status).toBeNumber().toEqual(200);
    expect(data).toBeObject().toContainKeys(['entries', 'status']);
    expect(data.status).toBeNumber().toEqual(200);
    expect(data.entries).toBeArray();
  });

  it('Should not get associated entries at "/api/v1/entries" if token is falsy', async () => {
    const { status, body: { error } } = await request(app).get('/api/v1/entries');
    expect(status).toBeNumber().toEqual(400);
    expect(error.messages).toBeArray().toIncludeAllMembers([
      {
        msg: 'Token must be string data type',
        param: 'token',
        location: 'headers',
      },
      {
        msg: 'Token does not match Json Web Token format',
        param: 'token',
        location: 'headers',
      },
      {
        msg: 'Token is required',
        param: 'token',
        location: 'headers',
      },
    ]);
  });

  it('Should NOT get all associated entries at at "/api/v1/entries" if User is not authenticated', async () => {
    const { status, body: { error } } = await request(app).get('/api/v1/entries')
      .set('token', utils.user.mock2.token401);
    expect(status).toBeNumber().toEqual(401);
    expect(error).toBeObject().toContainKeys(['message', 'status']);
    expect(error.message).toBeString().toEqual('User not found, please sign up by creating an account');
  });
});

describe('Authenticated User can get an associated, specific entry by its id', () => {
  it('Should get a specific entry at "/api/v1/entries/:id" by its id', async () => {
    const { status, body: { data } } = await request(app).get(`/api/v1/entries/${utils.entry.mock.id}`)
      .set('token', utils.user.mock2.token);
    expect(status).toBeNumber().toEqual(200);
    expect(data).toBeObject().toContainKeys(['entry', 'status']);
    expect(data.status).toBeNumber().toEqual(200);
    expect(data.entry.title).toBeString().toEqual(utils.entry.mock.title);
    expect(data.entry.body).toBeString().toEqual(utils.entry.mock.body);
    expect(data.entry.id).toBeString().toEqual(utils.entry.mock.id);
    expect(data.entry.UserId).toBeString();
    expect(data.entry.createdAt).toBeString();
    expect(data.entry.updatedAt).toBeString();
  });

  it('Should not get associated, specific entry at "/api/v1/entries/:id" if token is falsy', async () => {
    const { status, body: { error } } = await request(app).get(`/api/v1/entries/${utils.entry.mock.id}`);
    expect(status).toBeNumber().toEqual(400);
    expect(error.messages).toBeArray().toIncludeAllMembers([
      {
        msg: 'Token must be string data type',
        param: 'token',
        location: 'headers',
      },
      {
        msg: 'Token does not match Json Web Token format',
        param: 'token',
        location: 'headers',
      },
      {
        msg: 'Token is required',
        param: 'token',
        location: 'headers',
      },
    ]);
  });

  it('Should NOT get associated, specific entries at at "/api/v1/entries/:id" if User is not authenticated', async () => {
    const { status, body: { error } } = await request(app).get(`/api/v1/entries/${utils.entry.mock.id}`)
      .set('token', utils.user.mock2.token401);
    expect(status).toBeNumber().toEqual(401);
    expect(error).toBeObject().toContainKeys(['message', 'status']);
    expect(error.message).toBeString().toEqual('User not found, please sign up by creating an account');
  });

  it('Should NOT get associated, specific entries at at "/api/v1/entries/:id" if entry does not exist', async () => {
    const { status, body: { error } } = await request(app).get(`/api/v1/entries/${utils.entry.mock.id404}`)
      .set('token', utils.user.mock2.token);
    expect(status).toBeNumber().toEqual(404);
    expect(error).toBeObject().toContainKeys(['message', 'status']);
    expect(error.message).toBeString().toEqual('Entry not found');
  });
});

describe('Authenticated User can update an associated, specific entry by its id', () => {
  it('Should update a specific entry at "/api/v1/entries:id" if all input fields are valid', async () => {
    const { status, body: { data } } = await request(app).put(`/api/v1/entries/${utils.entry.mock.id}`)
      .set('token', utils.user.mock2.token).send(utils.entry.mock2);
    expect(status).toBeNumber().toEqual(200);
    expect(data).toBeObject().toContainKeys(['entry', 'status']);
    expect(data.status).toBeNumber().toEqual(200);
    expect(data.entry.title).toBeString().toEqual(utils.entry.mock2.title);
    expect(data.entry.body).toBeString().toEqual(utils.entry.mock2.body);
    expect(data.entry.id).toBeString();
    expect(data.entry.UserId).toBeString();
    expect(data.entry.createdAt).toBeString();
    expect(data.entry.updatedAt).toBeString();
  });

  // preceding tests affects results here
  it('Should not update a specific entry at "/api/v1/entries:id" if all input fields are not sent', async () => {
    const { status, body: { data } } = await request(app).put(`/api/v1/entries/${utils.entry.mock.id}`)
      .set('token', utils.user.mock2.token);
    expect(status).toBeNumber().toEqual(200);
    expect(data).toBeObject().toContainKeys(['entry', 'status']);
    expect(data.status).toBeNumber().toEqual(200);
    expect(data.entry.title).toBeString().toEqual(utils.entry.mock2.title);
    expect(data.entry.body).toBeString().toEqual(utils.entry.mock2.body);
    expect(data.entry.id).toBeString();
    expect(data.entry.UserId).toBeString();
    expect(data.entry.createdAt).toBeString();
    expect(data.entry.updatedAt).toBeString();
  });

  it('Should not update associated, specific entry at "/api/v1/entries/:id" if token is falsy', async () => {
    const { status, body: { error } } = await request(app).put(`/api/v1/entries/${utils.entry.mock.id}`)
      .send(utils.entry.mock2);
    expect(status).toBeNumber().toEqual(400);
    expect(error.messages).toBeArray().toIncludeAllMembers([
      {
        msg: 'Token must be string data type',
        param: 'token',
        location: 'headers',
      },
      {
        msg: 'Token does not match Json Web Token format',
        param: 'token',
        location: 'headers',
      },
      {
        msg: 'Token is required',
        param: 'token',
        location: 'headers',
      },
    ]);
  });

  it('Should NOT update associated, specific entries at at "/api/v1/entries/:id" if User is not authenticated', async () => {
    const { status, body: { error } } = await request(app).put(`/api/v1/entries/${utils.entry.mock.id}`)
      .set('token', utils.user.mock2.token401);
    expect(status).toBeNumber().toEqual(401);
    expect(error).toBeObject().toContainKeys(['message', 'status']);
    expect(error.message).toBeString().toEqual('User not found, please sign up by creating an account');
  });

  it('Should NOT update associated, specific entries at at "/api/v1/entries/:id" if entry does not exist', async () => {
    const { status, body: { error } } = await request(app).put(`/api/v1/entries/${utils.entry.mock.id404}`)
      .set('token', utils.user.mock2.token);
    expect(status).toBeNumber().toEqual(404);
    expect(error).toBeObject().toContainKeys(['message', 'status']);
    expect(error.message).toBeString().toEqual('Entry not found');
  });
});
