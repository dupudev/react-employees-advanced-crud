import { createContext, useState } from 'react';
import { demoCompletedTasks } from '../utils/demoCompletedTasks';

const CompletedTasksContext = createContext();

export const CompletedTasksProvider = ({ children }) => {
  const [completedTasks, setCompletedTasks] = useState(demoCompletedTasks);
  const [completedTasksCurrentMonth, setCompletedTasksCurrentMonth] =
    useState(demoCompletedTasks);

  return (
    <CompletedTasksContext.Provider
      value={{
        completedTasks,
        setCompletedTasks,
        completedTasksCurrentMonth,
        setCompletedTasksCurrentMonth,
      }}
    >
      {children}
    </CompletedTasksContext.Provider>
  );
};

export default CompletedTasksContext;
