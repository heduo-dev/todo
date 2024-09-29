import axios from 'axios';
import { Task } from './types';

const API_URL = 'http://localhost:5000';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

export const createTask = async (title: string, description: string): Promise<Task> => {
    const response = await axios.post(`${API_URL}/tasks`, { title, description });
    return response.data;
};

export const updateTask = async (id: string, title: string, description: string): Promise<Task> => {
  const response = await axios.put(`${API_URL}/tasks/${id}`, { title, description });
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/tasks/${id}`);
};