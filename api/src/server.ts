import { createApp } from './app';
import {Task} from './types'

const PORT = process.env.PORT || 5000;
const initialTasks: Task[] = [
    {
        id: '1',
        title: 'running',
        description: 'Running at 6:00am'
    },
    {
        id: '2',
        title: 'swimming',
        description: 'swimming at 7:00am'
    }
]
const app = createApp(initialTasks);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});