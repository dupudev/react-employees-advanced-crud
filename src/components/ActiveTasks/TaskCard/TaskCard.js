///Bootstrap
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

///Icons
import { BiTaskX, BiEditAlt, BiTrashAlt } from 'react-icons/bi';

///Contexts
import TasksContext from '../../../contexts/TasksContext';
import CompletedTasksContext from '../../../contexts/CompletedTasksContext';
import EmployeesContext from '../../../contexts/EmployeesContext';

///Hooks
import React, { useContext } from 'react';

const TaskCard = ({
  title,
  description,
  assignee,
  date,
  taskIdx,
  setEditMode,
}) => {
  const { tasks, setTasks } = useContext(TasksContext);
  const { setCompletedTasks, setCompletedTasksCurrentMonth } = useContext(
    CompletedTasksContext
  );
  const { setEmployees } = useContext(EmployeesContext);

  ///------------------------
  /// Edit Task
  ///------------------------
  const editTask = () => {
    setEditMode({
      mode: true,
      idx: taskIdx,
      title: tasks[taskIdx].title,
      description: tasks[taskIdx].description,
      assignee: tasks[taskIdx].assignee,
      date: tasks[taskIdx].date,
    });
  };

  ///------------------------
  /// Delete Task
  ///------------------------
  const deleteTask = () => {
    setTasks((currVal) => {
      const tempTasks = [...currVal];
      tempTasks.splice(taskIdx, 1);
      return tempTasks;
    });
  };

  ///------------------------
  /// Mark task as completed
  ///------------------------
  const markAsCompleted = () => {
    const date = new Date();

    const day = date.getDate().toString().padStart(2, 0);
    const month = () => {
      let month = date.getMonth() + 1;
      return month.toString().padStart(2, 0);
    };

    const year = date.getFullYear().toString();
    const completionDate = `${day}.${month()}.${year}.`;

    let newTaskId;
    if (tasks.length == 0) {
      newTaskId = 0;
    } else {
      newTaskId = tasks.slice(-1)[0].id + 1;
    }

    const newCompletedTask = {
      id: newTaskId,
      title: title,
      description: description,
      assignee: assignee,
      date: completionDate,
    };

    console.log(completionDate);

    setCompletedTasks((currVal) => [...currVal, newCompletedTask]);
    setCompletedTasksCurrentMonth((currVal) => [...currVal, newCompletedTask]);

    setEmployees((currVal) => {
      const tempAssignee = assignee.split(' ');
      const tempEmployees = [...currVal];
      const tempIdx = tempEmployees.findIndex((employee) => {
        if (
          employee.firstName === tempAssignee[0] &&
          employee.lastName === tempAssignee[1]
        ) {
          return employee;
        }
      });

      if (tempIdx < 0) {
        return tempEmployees;
      } else {
        tempEmployees[tempIdx].completedTasks += 1;
        return tempEmployees;
      }
    });

    setTasks((currVal) => {
      const tempTasks = [...currVal];
      tempTasks.splice(taskIdx, 1);
      return tempTasks;
    });
  };

  return (
    <Card
      className='h-100'
      style={{
        minWidth: '18rem',
        border: 'none',
        boxShadow: '5px 5px 15px rgb(0 0 0 / 0.2)',
      }}
    >
      <Card.Body className='py-3 text-center'>
        <div className='d-flex justify-content-between '>
          <div className='text-center align-self-center'>
            <BiTaskX style={{ fontSize: '95px' }} />
          </div>
          <div className='d-flex flex-column gap-2'>
            <Button variant='warning' onClick={editTask}>
              <BiEditAlt className='fs-4' />
            </Button>
            <DropdownButton
              drop='up-centered'
              variant='danger'
              title={<BiTrashAlt className='fs-4' />}
            >
              <Dropdown.Item disabled className='text-center text-dark fs-5'>
                Delete task?
              </Dropdown.Item>
              <Dropdown.Item
                as={Button}
                className='text-center text-white bg-danger py-2 mb-2 mt-3 mx-auto w-75'
                onClick={deleteTask}
              >
                Confirm
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <Card.Title className='my-0 fs-4 text-start mt-3'>{title}</Card.Title>
      </Card.Body>
      <ListGroup className='list-group-flush pb-3'>
        <ListGroup.Item>
          <p className='mb-1 text-muted'>Description:</p>
          <p className='m-0 '>{description}</p>
        </ListGroup.Item>
        <ListGroup.Item>
          <p className='mb-1 text-muted'>Assignee:</p>
          <p className='m-0 '>{assignee}</p>
        </ListGroup.Item>
        <ListGroup.Item>
          <p className='mb-1 text-muted'>Due date:</p>
          <p className='m-0'>{date}</p>
        </ListGroup.Item>
        <ListGroup.Item className='mx-auto pt-4'>
          {/* <Button variant='success' onClick={markAsCompleted}>
            Mark as Completed
          </Button> */}
          <DropdownButton
            drop='up-centered'
            variant='success'
            title='Mark as Completed'
          >
            <Dropdown.Item disabled className='text-center text-dark fs-5'>
              Task completed?
            </Dropdown.Item>
            <Dropdown.Item
              as={Button}
              className='text-center text-white bg-success py-2 mb-2 mt-3 mx-auto w-75'
              onClick={markAsCompleted}
            >
              Confirm
            </Dropdown.Item>
          </DropdownButton>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default TaskCard;
