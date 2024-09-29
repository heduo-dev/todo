import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm'
import { Task } from './types';
import { fetchTasks, createTask, updateTask, deleteTask } from './api';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const handleCreateTask = async (id: string, title: string, description: string) => {
    const newTask = await createTask(title, description);
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = async (id: string, title: string, description: string) => {
    const updatedTask = await updateTask(id, title, description);
    setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    setEditingTask(null);
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="nsw-container">
      <div className="nsw-layout">
        <main className="nsw-layout__main">
          <div className="nsw-docs__box nsw-docs__box--large">
            <h1>To Do List</h1>
            <TaskForm
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              initialTask={editingTask}
            />
            <br />
            <TaskList
              tasks={tasks}
              onEdit={setEditingTask}
              onDelete={handleDeleteTask}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;