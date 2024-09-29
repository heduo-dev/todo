import React from 'react';
import { Task } from '../types';

interface TaskListProps {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    editingTask: Task | null
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, editingTask }) => {
    return (
        <div className=''>
            {tasks.map(task => (
                <div key={task.id} className="nsw-list-item">
                    <div className='nsw-list-item__content'>
                        <h3 className="nsw-list-item__title">{task.title}</h3>
                        <p>{task.description}</p>
                        <div className="nsw-list nsw-list--8">
                            <button className="nsw-button nsw-button--dark-outline-solid" onClick={() => onEdit(task)}>Edit</button>
                            <button disabled={editingTask?.id === task.id ? true : false} className="nsw-button nsw-button--danger" onClick={() => onDelete(task.id)}>Delete</button>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default TaskList;