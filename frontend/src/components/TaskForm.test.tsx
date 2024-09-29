
import { expect, test, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from './TaskForm.tsx';

test('renders empty form', () => {
  render(<TaskForm onSubmit={vi.fn()} />);
  expect(screen.getByPlaceholderText('Task title')).toHaveValue('');
  expect(screen.getByPlaceholderText('Task description')).toHaveValue('');
  expect(screen.getByText('Add Task')).toBeInTheDocument();
});

test('renders form with initial task', () => {
  const initialTask = { id: '1', title: 'Test Task', description: 'Test Description' };
  render(<TaskForm onSubmit={vi.fn()} initialTask={initialTask} />);
  expect(screen.getByPlaceholderText('Task title')).toHaveValue('Test Task');
  expect(screen.getByPlaceholderText('Task description')).toHaveValue('Test Description');
  expect(screen.getByText('Update Task')).toBeInTheDocument();
});

test('calls onSubmit with form data', () => {
  const mockOnSubmit = vi.fn();
  render(<TaskForm onSubmit={mockOnSubmit} />);
  userEvent.type(screen.getByPlaceholderText('Task title'), 'New Task');
  userEvent.type(screen.getByPlaceholderText('Task description'), 'New Description');
  userEvent.click(screen.getByText('Add Task'));

  waitFor(() => {
    expect(mockOnSubmit).toHaveBeenCalledWith({id: undefined, title: 'New Task', description: 'New Description'});
  })
});