///Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

///Contexts
import EmployeesContext from '../../../contexts/EmployeesContext';

///Reducer
import {
  employeesReducer,
  INITIAL_STATE,
  ACTION,
} from '../../../utils/FormEmployeesReducer';

///Hooks
import React, { useContext, useReducer, useRef, useEffect } from 'react';

const FormEmployees = ({ editMode, setEditMode }) => {
  const firstNameInput = useRef();
  const [state, dispatch] = useReducer(employeesReducer, INITIAL_STATE);
  const { employees, setEmployees } = useContext(EmployeesContext);

  ///--------------------------------
  /// Auto fill form with selected employees information
  ///--------------------------------
  useEffect(() => {
    if (editMode.mode) {
      firstNameInput.current.focus();
      dispatch({
        type: ACTION.CHANGE_FIRST_NAME,
        payload: employees[editMode.idx].firstName,
      });
      dispatch({
        type: ACTION.CHANGE_LAST_NAME,
        payload: employees[editMode.idx].lastName,
      });
      dispatch({
        type: ACTION.CHANGE_EMAIL,
        payload: employees[editMode.idx].email,
      });
      dispatch({
        type: ACTION.CHANGE_PHONE,
        payload: employees[editMode.idx].phone,
      });
      dispatch({
        type: ACTION.CHANGE_DATE,
        payload: employees[editMode.idx].date
          .split('.')
          .slice(0, -1)
          .reverse()
          .join('-'),
      });
      dispatch({
        type: ACTION.CHANGE_SALARY,
        payload: employees[editMode.idx].salary,
      });
    }
  }, [editMode]);

  ///--------------------------------
  /// Add new employee
  ///--------------------------------
  const addNewEmployee = (event) => {
    event.preventDefault();

    const formattedDate = `${state.date.split('-').reverse().join('.')}.`;

    let newEmployeeId;
    if (employees.length == 0) {
      newEmployeeId = 0;
    } else {
      newEmployeeId = employees.slice(-1)[0].id + 1;
    }

    const newEmployee = {
      id: newEmployeeId,
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      phone: state.phone,
      date: formattedDate,
      salary: Number(state.salary),
      completedTasks: 0,
    };

    setEmployees((currVal) => [...currVal, newEmployee]);

    state.firstName = '';
    state.lastName = '';
    state.email = '';
    state.phone = '';
    state.date = '';
    state.salary = '';

    firstNameInput.current.focus();
  };

  ///--------------------------------
  /// Save changes
  ///--------------------------------
  const saveChanges = (event) => {
    event.preventDefault();

    const formattedDate = `${state.date.split('-').reverse().join('.')}.`;

    const editedEmployee = {
      id: employees[editMode.idx].id,
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      phone: state.phone,
      date: formattedDate,
      salary: Number(state.salary),
      completedTasks: employees[editMode.idx].completedTasks,
    };

    setEmployees((currVal) => {
      const tempEmployees = [...currVal];
      tempEmployees.splice(editMode.idx, 1, editedEmployee);
      return tempEmployees;
    });

    setEditMode({
      mode: false,
      idx: '',
      firstName: '',
      lastName: '',
    });

    state.firstName = '';
    state.lastName = '';
    state.email = '';
    state.phone = '';
    state.date = '';
    state.salary = '';
  };

  ///--------------------------------
  /// Cancel edit
  ///--------------------------------
  const cancelEdit = () => {
    setEditMode({
      mode: false,
      idx: '',
      firstName: '',
      lastName: '',
    });

    state.firstName = '';
    state.lastName = '';
    state.email = '';
    state.phone = '';
    state.date = '';
    state.salary = '';
  };

  return (
    <Container className='py-5 mt-5'>
      {editMode.mode ? (
        <h2 className='mb-5'>
          Edit Employee:{' '}
          <span className='fw-bold text-warning'>{`${editMode.firstName} ${editMode.lastName}`}</span>
        </h2>
      ) : (
        <h2 className='mb-5'>Add New Employee</h2>
      )}

      <Form
        onSubmit={
          editMode.mode
            ? (event) => saveChanges(event)
            : (event) => addNewEmployee(event)
        }
      >
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm={3} md={2}>
            First Name:
          </Form.Label>
          <Col sm={9} md={10}>
            <Form.Control
              ref={firstNameInput}
              required
              type='text'
              value={state.firstName}
              onChange={(event) =>
                dispatch({
                  type: ACTION.CHANGE_FIRST_NAME,
                  payload: event.target.value,
                })
              }
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm={3} md={2}>
            Last Name:
          </Form.Label>
          <Col sm={9} md={10}>
            <Form.Control
              required
              type='text'
              value={state.lastName}
              onChange={(event) =>
                dispatch({
                  type: ACTION.CHANGE_LAST_NAME,
                  payload: event.target.value,
                })
              }
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm={3} md={2}>
            Email:
          </Form.Label>
          <Col sm={9} md={10}>
            <Form.Control
              required
              type='email'
              value={state.email}
              onChange={(event) =>
                dispatch({
                  type: ACTION.CHANGE_EMAIL,
                  payload: event.target.value,
                })
              }
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm={3} md={2}>
            Phone:
          </Form.Label>
          <Col sm={9} md={10}>
            <Form.Control
              required
              type='text'
              value={state.phone}
              onChange={(event) =>
                dispatch({
                  type: ACTION.CHANGE_PHONE,
                  payload: event.target.value,
                })
              }
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm={3} md={2}>
            Date of Birth:
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
          <Form.Label column sm={3} md={2}>
            Salary:
          </Form.Label>
          <Col sm={9} md={10}>
            <Form.Control
              required
              type='number'
              value={state.salary}
              onChange={(event) =>
                dispatch({
                  type: ACTION.CHANGE_SALARY,
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
              <Button type='submit'>Add Employee</Button>
            )}
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default FormEmployees;
