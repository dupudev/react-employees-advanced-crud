///Components
import FormEmployees from '../../components/Employees/FormEmployees/FormEmployees';
import EmployeesList from '../../components/Employees/EmployeesList/EmployeesList';

///Hooks
import React, { useState } from 'react';

const Employees = () => {
  const [editMode, setEditMode] = useState({
    mode: false,
    idx: '',
    firstName: '',
    lastName: '',
  });
  return (
    <>
      <FormEmployees editMode={editMode} setEditMode={setEditMode} />
      <EmployeesList setEditMode={setEditMode} />
    </>
  );
};

export default Employees;
