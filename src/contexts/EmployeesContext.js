import { createContext, useState } from 'react';
import { demoEmployees } from '../utils/demoEmployees';

const EmployeesContext = createContext();

export const EmployeesProvider = ({ children }) => {
  const [employees, setEmployees] = useState(demoEmployees);

  return (
    <EmployeesContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeesContext.Provider>
  );
};

export default EmployeesContext;
