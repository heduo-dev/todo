import { expect, test, vi, describe, afterEach } from 'vitest'
import axios from 'axios';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api';

vi.mock('axios');
const mockedAxios = axios as vi.Mocked<typeof axios>;

describe('API functions', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('fetchTasks', async () => {
    const tasks = [{ id: '1', title: 'Test Task', description: 'Test Description' }];
    mockedAxios.get.mockResolvedValue({ data: tasks });
    const result = await fetchTasks();
    expect(result).toEqual(tasks);
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:5000/tasks');
  });

  test('createTask', async () => {
    const newTask = { id: '1', title: 'New Task', description: 'New Description' };
    mockedAxios.post.mockResolvedValue({ data: newTask });
    const result = await createTask('New Task', 'New Description');
    expect(result).toEqual(newTask);
    expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:5000/tasks', { title: 'New Task', description: 'New Description' });
  });

  test('updateTask', async () => {
    const updatedTask = { id: '1', title: 'Updated Task', description: 'Updated Description' };
    mockedAxios.put.mockResolvedValue({ data: updatedTask });
    const result = await updateTask('1', 'Updated Task', 'Updated Description');
    expect(result).toEqual(updatedTask);
    expect(mockedAxios.put).toHaveBeenCalledWith('http://localhost:5000/tasks/1', { title: 'Updated Task', description: 'Updated Description' });
  });

  test('deleteTask', async () => {
    mockedAxios.delete.mockResolvedValue({ status: 204 });
    await deleteTask('1');
    expect(mockedAxios.delete).toHaveBeenCalledWith('http://localhost:5000/tasks/1');
  });
});