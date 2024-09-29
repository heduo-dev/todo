export interface Task {
    id: string;
    title: string;
    description: string;
  }
  
  export interface TaskStore {
    tasks: Task[];
    addTask: (task: Task) => void;
    getTask: (id: string) => Task | undefined;
    updateTask: (id: string, updates: Partial<Task>) => Task | null;
    deleteTask: (id: string) => boolean;
  }