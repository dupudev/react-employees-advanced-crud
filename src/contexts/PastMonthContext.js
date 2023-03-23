import { createContext, useState } from 'react';

const PastMonthContext = createContext();

export const PastMonthProvider = ({ children }) => {
  const [pastMonth, setPastMonth] = useState({
    employees: 0,
    totalTasks: 0,
    completedTasks: 0,
    uncompletedTasks: 0,
    topEmployees: [],
  });

  return (
    <PastMonthContext.Provider value={{ pastMonth, setPastMonth }}>
      {children}
    </PastMonthContext.Provider>
  );
};

export default PastMonthContext;
