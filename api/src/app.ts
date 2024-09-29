import express from 'express'
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStore } from './types';

export const createApp = (initialTasks: Task[] = []) => {
    const app = express();
    app.use(express.json());
    app.use(cors());

    const taskStore: TaskStore = {
        tasks: initialTasks,
        addTask: (task: Task) => taskStore.tasks.push(task),
        getTask: (id: string) => taskStore.tasks.find(t => t.id === id),
        updateTask: (id: string, updates: Partial<Task>) => {
            const index = taskStore.tasks.findIndex(t => t.id === id);
            if (index !== -1) {
                taskStore.tasks[index] = { ...taskStore.tasks[index], ...updates };
                return taskStore.tasks[index];
            }
            return null;
        },
        deleteTask: (id: string) => {
            const index = taskStore.tasks.findIndex(t => t.id === id);
            if (index !== -1) {
                taskStore.tasks.splice(index, 1);
                return true;
            }
            return false;
        },
    };

    app.get('/tasks', (req, res) => {
        res.json(taskStore.tasks);
    });

    app.get('/tasks/:id', (req, res) => {
        const task = taskStore.getTask(req.params.id);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    });

    app.post('/tasks', (req: any, res: any) => {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }
        const newTask: Task = {
            id: uuidv4(),
            title,
            description: description || ''
        };
        taskStore.addTask(newTask);
        res.status(201).json(newTask);
    });

    app.put('/tasks/:id', (req: any, res: any) => {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }
        const updatedTask = taskStore.updateTask(req.params.id, { title, description });
        if (updatedTask) {
            res.json(updatedTask);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    });

    app.delete('/tasks/:id', (req, res) => {
        const deleted = taskStore.deleteTask(req.params.id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    });

    return app;
};
