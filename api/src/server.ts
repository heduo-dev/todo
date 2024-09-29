import { createApp } from './app';
import {Task} from './types'

const PORT = process.env.PORT || 5000;

const app = createApp();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});