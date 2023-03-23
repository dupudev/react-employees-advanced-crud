///Bootstrap
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

///Icons
import { BiUser, BiEditAlt, BiTrashAlt } from 'react-icons/bi';

///Contexts
import EmployeesContext from '../../../contexts/EmployeesContext';

///Hooks
import React, { useContext } from 'react';

const EmployeeCard = ({
  firstName,
  lastName,
  email,
  phone,
  date,
  salary,
  employeeIdx,
  setEditMode,
}) => {
  const { employees, setEmployees } = useContext(EmployeesContext);

  ///------------------------
  /// Edit Employee
  ///------------------------
  const editEmployee = () => {
    setEditMode({
      mode: true,
      idx: employeeIdx,
      firstName: employees[employeeIdx].firstName,
      lastName: employees[employeeIdx].lastName,
      email: employees[employeeIdx].email,
      phone: employees[employeeIdx].phone,
      date: employees[employeeIdx].date,
      salary: employees[employeeIdx].salary,
    });
  };

  ///------------------------
  /// Delete Employee
  ///------------------------
  const deleteEmployee = () => {
    setEmployees((currVal) => {
      const tempEmployees = [...currVal];
      tempEmployees.splice(employeeIdx, 1);
      return tempEmployees;
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
        <div className='d-flex justify-content-between'>
          <div className='text-center align-self-center'>
            <BiUser style={{ fontSize: '100px' }} />
          </div>
          <div className='d-flex flex-column gap-2'>
            <Button variant='warning' onClick={editEmployee}>
              <BiEditAlt className='fs-4' />
            </Button>
            <DropdownButton
              drop='up-centered'
              variant='danger'
              title={<BiTrashAlt className='fs-4' />}
            >
              <Dropdown.Item disabled className='text-center text-dark fs-5'>
                Delete employee?
              </Dropdown.Item>
              <Dropdown.Item
                as={Button}
                className='text-center text-white bg-danger py-2 mb-2 mt-3 mx-auto w-75'
                onClick={deleteEmployee}
              >
                Confirm
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <Card.Title className='my-0 fs-4 text-start mt-3'>{`${firstName} ${lastName}`}</Card.Title>
      </Card.Body>
      <ListGroup className='list-group-flush pb-3'>
        <ListGroup.Item>
          <p className='mb-1 text-muted'>Email:</p>
          <p className='m-0 '>{email}</p>
        </ListGroup.Item>
        <ListGroup.Item>
          <p className='mb-1 text-muted'>Phone:</p>
          <p className='m-0 '>{phone}</p>
        </ListGroup.Item>
        <ListGroup.Item>
          <p className='mb-1 text-muted'>Date Of Birth:</p>
          <p className='m-0'>{date}</p>
        </ListGroup.Item>
        <ListGroup.Item>
          <p className='mb-1 text-muted'>Monthly Salary:</p>
          <p className='m-0'>${salary}</p>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default EmployeeCard;
