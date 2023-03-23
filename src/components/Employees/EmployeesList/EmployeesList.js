///Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

///Components
import EmployeeCard from '../../../components/Employees/EmployeeCard/EmployeeCard';

///Contexts
import EmployeesContext from '../../../contexts/EmployeesContext';

///Hooks
import React, { useContext } from 'react';

const EmployeesList = ({ setEditMode }) => {
  const { employees } = useContext(EmployeesContext);

  return (
    <Container className='py-5'>
      <Row md={2} lg={3} xxl={4} className='g-4'>
        {employees.map(
          ({ firstName, lastName, email, phone, date, salary }, idx) => {
            return (
              <Col key={idx}>
                <EmployeeCard
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  phone={phone}
                  date={date}
                  salary={salary}
                  employeeIdx={idx}
                  setEditMode={setEditMode}
                />
              </Col>
            );
          }
        )}
      </Row>
    </Container>
  );
};

export default EmployeesList;
