///Pages
import Navigation from './components/Navigation/Navigation';
import Employees from './pages/Employees/Employees';
import Tasks from './pages/Tasks/Tasks';
import CompletedTasks from './pages/CompletedTasks/CompletedTasks';
import Dashboard from './pages/Dashboard/Dashboard';

///Context providers
import { EmployeesProvider } from './contexts/EmployeesContext';
import { TasksProvider } from './contexts/TasksContext';
import { CompletedTasksProvider } from './contexts/CompletedTasksContext';
import { PastMonthProvider } from './contexts/PastMonthContext';

///Hooks
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className='App'>
      <EmployeesProvider>
        <TasksProvider>
          <CompletedTasksProvider>
            <PastMonthProvider>
              <HashRouter>
                <Navigation />
                <Routes>
                  <Route path='/' element={<Employees />} />
                  <Route path='tasks' element={<Tasks />} />
                  <Route path='completed' element={<CompletedTasks />} />
                  <Route path='dashboard' element={<Dashboard />} />
                </Routes>
              </HashRouter>
            </PastMonthProvider>
          </CompletedTasksProvider>
        </TasksProvider>
      </EmployeesProvider>
    </div>
  );
};

export default App;
