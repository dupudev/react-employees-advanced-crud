import { createContext, useState } from 'react';
import { demoTasks } from '../utils/demoTasks';

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(demoTasks);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContext;
