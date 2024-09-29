import React, { useState, useEffect } from 'react';
import { Task } from '../types';

interface TaskFormProps {
    onSubmit: (id: string, title: string, description: string) => void;
    initialTask?: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (initialTask) {
            setTitle(initialTask.title);
            setDescription(initialTask.description);
        }
    }, [initialTask]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(initialTask?.id, title, description);
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="nsw-form">
            <div className="nsw-form__group">
                <input
                    className="nsw-form__input"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Task title"
                    required
                />
            </div>
            <div className="nsw-form__group">
                <textarea
                  className="nsw-form__input"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Task description"
                />
            </div>
            <br />
            <button type="submit" className="nsw-button nsw-button--dark">{initialTask ? 'Update Task' : 'Add Task'}</button>
        </form>
    );
};

export default TaskForm;