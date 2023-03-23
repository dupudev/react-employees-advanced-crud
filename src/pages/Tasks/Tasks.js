///Components
import TasksList from '../../components/ActiveTasks/TasksList/TasksList';
import FormTasks from '../../components/ActiveTasks/FormTasks/FormTasks';
// import TasksList from '../../components/TasksList/TasksList';
// import FormTasks from '../../components/FormTasks/FormTasks';

///Hooks
import React, { useState } from 'react';

const Tasks = () => {
  const [editMode, setEditMode] = useState({
    mode: false,
    idx: '',
    title: '',
  });
  return (
    <>
      <FormTasks editMode={editMode} setEditMode={setEditMode} />
      <TasksList setEditMode={setEditMode} />
    </>
  );
};

export default Tasks;
