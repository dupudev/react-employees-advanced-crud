///Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

///Contexts
import TasksContext from '../../../contexts/TasksContext';
import EmployeesContext from '../../../contexts/EmployeesContext';

///Reducer

import {
  tasksReducer,
  INITIAL_STATE,
  ACTION,
} from '../../../utils/FormTasksReducer';

///Hooks
import React, { useContext, useReducer, useRef, useEffect } from 'react';

const FormTasks = ({ editMode, setEditMode }) => {
  const titleInput = useRef();
  const [state, dispatch] = useReducer(tasksReducer, INITIAL_STATE);
  const { tasks, setTasks } = useContext(TasksContext);
  const { employees } = useContext(EmployeesContext);

  ///--------------------------------
  /// Auto fill form with selected tasks information
  ///--------------------------------
  useEffect(() => {
    if (editMode.mode) {
      titleInput.current.focus();
      dispatch({
        type: ACTION.CHANGE_TITLE,
        payload: tasks[editMode.idx].title,
      });
      dispatch({
        type: ACTION.CHANGE_DESCRIPTION,
        payload: tasks[editMode.idx].description,
      });
      dispatch({
        type: ACTION.CHANGE_ASSIGNEE,
        payload: tasks[editMode.idx].assignee,
      });
      dispatch({
        type: ACTION.CHANGE_DATE,
        payload: tasks[editMode.idx].date
          .split('.')
          .slice(0, -1)
          .reverse()
          .join('-'),
      });
    }
  }, [editMode]);

  ///--------------------------------
  /// Create new task
  ///--------------------------------
  const createNewTask = (event) => {
    event.preventDefault();

    const formattedDate = `${state.date.split('-').reverse().join('.')}.`;

    let newTaskId;
    if (tasks.length == 0) {
      newTaskId = 0;
    } else {
      newTaskId = tasks.slice(-1)[0].id + 1;
    }

    const newTask = {
      id: newTaskId,
      title: state.title,
      description: state.description,
      assignee: state.assignee,
      date: formattedDate,
    };

    setTasks((currVal) => [...currVal, newTask]);

    state.title = '';
    state.description = '';
    state.assignee = '';
    state.date = '';

    titleInput.current.focus();
  };

  ///--------------------------------
  /// Save changes
  ///--------------------------------
  const saveChanges = (event) => {
    event.preventDefault();

    const formattedDate = `${state.date.split('-').reverse().join('.')}.`;

    const editedTask = {
      id: tasks[editMode.idx].id,
      title: state.title,
      description: state.description,
      assignee: state.assignee,
      date: formattedDate,
    };

    setTasks((currVal) => {
      const tempTasks = [...currVal];
      tempTasks.splice(editMode.idx, 1, editedTask);
      return tempTasks;
    });

    setEditMode({
      mode: false,
      idx: '',
      title: '',
    });

    state.title = '';
    state.description = '';
    state.assignee = '';
    state.date = '';
  };

  ///--------------------------------
  /// Cancel edit
  ///--------------------------------
  const cancelEdit = () => {
    setEditMode({
      mode: false,
      idx: '',
      title: '',
    });

    state.title = '';
    state.description = '';
    state.assignee = '';
    state.date = '';
  };

  return (
    <Container className='py-5 mt-5'>
      {editMode.mode ? (
        <h2 className='mb-5'>
          Edit Task:{' '}
          <span className='fw-bold text-warning'>{editMode.title}</span>
        </h2>
      ) : (
        <h2 className='mb-5'>Create New Task</h2>
      )}

      <Form
        onSubmit={
          editMode.mode
            ? (event) => saveChanges(event)
            : (event) => createNewTask(event)
        }
      >
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm={3} md={2}>
            Title:
          </Form.Label>
          <Col sm={9} md={10}>
            <Form.Control
              ref={titleInput}
              required
              type='text'
              value={state.title}
              onChange={(event) =>
                dispatch({
                  type: ACTION.CHANGE_TITLE,
                  payload: event.target.value,
                })
              }
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm={3} md={2}>
            Description:
          </Form.Label>
          <Col sm={9} md={10}>
            <Form.Control
              style={{ height: '120px' }}
              as='textarea'
              value={state.description}
              onChange={(event) =>
                dispatch({
                  type: ACTION.CHANGE_DESCRIPTION,
                  payload: event.target.value,
                })
              }
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm={3} md={2}>
            Assignee:
          </Form.Label>
          <Col sm={9} md={10}>
            <Form.Select
              required
              value={state.assignee}
              onChange={(event) =>
                dispatch({
                  type: ACTION.CHANGE_ASSIGNEE,
                  payload: event.target.value,
                })
              }
            >
              <option>Select assignee:</option>
              {employees.map((employee, idx) => {
                return (
                  <option
                    key={idx}
                  >{`${employee.firstName} ${employee.lastName}`}</option>
                );
              })}
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm={3} md={2}>
            Due date:
          </Form.Label>
          <Col sm={9} md={10}>
            <Form.Control
              required
              type='date'
              value={state.date}
              onChange={(event) =>
                dispatch({
                  type: ACTION.CHANGE_DATE,
                  payload: event.target.value,
                })
              }
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
          <Col sm={{ span: 9, offset: 3 }} md={{ span: 10, offset: 2 }}>
            {editMode.mode ? (
              <div className='d-flex gap-2'>
                <Button type='submit' variant='success'>
                  Save Changes
                </Button>
                <Button variant='danger' onClick={cancelEdit}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button type='submit'>Create Task</Button>
            )}
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default FormTasks;
