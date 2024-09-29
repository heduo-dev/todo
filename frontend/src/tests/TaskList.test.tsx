import { expect, test, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskList from '../components/TaskList';

const mockTasks = [
    { id: '1', title: 'Task 1', description: 'Description 1' },
    { id: '2', title: 'Task 2', description: 'Description 2' },
];

test('renders task list', () => {
    render(<TaskList tasks={mockTasks} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
});

test('calls onEdit when edit button is clicked', () => {
    const mockOnEdit = vi.fn();
    render(<TaskList tasks={mockTasks} onEdit={mockOnEdit} onDelete={vi.fn()} />);
    userEvent.click(screen.getAllByText('Edit')[0]);
    waitFor(() => {
        expect(mockOnEdit).toHaveBeenCalledWith(mockTasks[0]);
    })

});

test('calls onDelete when delete button is clicked', () => {
    const mockOnDelete = vi.fn();
    render(<TaskList tasks={mockTasks} onEdit={vi.fn()} onDelete={mockOnDelete} />);
    userEvent.click(screen.getAllByText('Delete')[0]);
    waitFor(() => {
        expect(mockOnDelete).toHaveBeenCalledWith(mockTasks[0].id);
    })
});

