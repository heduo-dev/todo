import request from 'supertest';
import { createApp } from '../app';

describe('Task API', () => {
  const app = createApp();

  it('GET /tasks should return an empty array initially', async () => {
    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('POST /tasks should create a new task', async () => {
    const newTask = {title: 'Test Task', description: 'Test Description' };
    const response = await request(app).post('/tasks').send(newTask);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newTask);
    expect(response.body.id).toBeDefined();
  });

  it('POST /tasks should return status 400 if new task does not have required title', async () => {
    const newTask = {description: 'Test Description' };
    const response = await request(app).post('/tasks').send(newTask);
    expect(response.status).toBe(400);
  });

  it('GET /tasks/:id should return a specific task', async () => {
    const newTask = { title: 'Test Task', description: 'Test Description' };
    const createResponse = await request(app).post('/tasks').send(newTask);
    const taskId = createResponse.body.id;

    const response = await request(app).get(`/tasks/${taskId}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(newTask);
    expect(response.body.id).toBe(taskId);
  });

  it('GET /tasks/:id with bad id should return a status code 404', async () => {
    const response = await request(app).get(`/tasks/badid`);
    expect(response.status).toBe(404);
  });

  it('PUT /tasks/:id should update an existing task', async () => {
    const newTask = { title: 'Test Task', description: 'Test Description' };
    const createResponse = await request(app).post('/tasks').send(newTask);
    const taskId = createResponse.body.id;

    const updatedTask = { title: 'Updated Task', description: 'Updated Description' };
    const response = await request(app).put(`/tasks/${taskId}`).send(updatedTask);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedTask);
    expect(response.body.id).toBe(taskId);
  });

  it('DELETE /tasks/:id should delete an existing task', async () => {
    const newTask = { title: 'Test Task', description: 'Test Description' };
    const createResponse = await request(app).post('/tasks').send(newTask);
    const taskId = createResponse.body.id;

    const deleteResponse = await request(app).delete(`/tasks/${taskId}`);
    expect(deleteResponse.status).toBe(204);

    const getResponse = await request(app).get(`/tasks/${taskId}`);
    expect(getResponse.status).toBe(404);
  });
});