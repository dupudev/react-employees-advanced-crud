///Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

///Icons
import { BiUser, BiTask, BiTaskX } from 'react-icons/bi';
import { FaTasks } from 'react-icons/fa';

///Contexts
import EmployeesContext from '../../../contexts/EmployeesContext';
import TasksContext from '../../../contexts/TasksContext';
import CompletedTasksContext from '../../../contexts/CompletedTasksContext';
import PastMonthContext from '../../../contexts/PastMonthContext';

///Hooks
import React, { useContext, useState, useEffect } from 'react';

const CurrentMonthStats = () => {
  const { employees, setEmployees } = useContext(EmployeesContext);
  const { tasks } = useContext(TasksContext);
  const { completedTasksCurrentMonth, setCompletedTasksCurrentMonth } =
    useContext(CompletedTasksContext);
  const { setPastMonth } = useContext(PastMonthContext);

  const [topEmployees, setTopEmployees] = useState([]);

  ///--------------------------------
  /// Sorting and filtering 5 employees with highest number of completed tasks
  ///--------------------------------
  useEffect(() => {
    const tempEmployees = [...employees];
    const sortedEmployees = tempEmployees.sort(
      (a, b) => b.completedTasks - a.completedTasks
    );
    const topFive = sortedEmployees.slice(0, 5);

    setTopEmployees(topFive);
  }, [employees]);

  ///--------------------------------
  /// Simulate end of the month
  ///--------------------------------
  const changeMonth = () => {
    setPastMonth({
      employees: employees.length,
      totalTasks: completedTasksCurrentMonth.length + tasks.length,
      completedTasks: completedTasksCurrentMonth.length,
      uncompletedTasks: tasks.length,
      topEmployees: topEmployees.map((employee) => {
        return {
          firstName: employee.firstName,
          lastName: employee.lastName,
          completedTasks: employee.completedTasks,
        };
      }),
    });

    setCompletedTasksCurrentMonth([]);

    setEmployees((currVal) => {
      currVal.forEach((employee) => (employee.completedTasks = 0));
      return currVal;
    });
  };

  return (
    <>
      <Container className='py-5'>
        <div className='d-flex flex-column-reverse flex-sm-row gap-5 justify-content-between align-items-center py-5'>
          <h2 className='align-self-start align-self-sm-center m-0'>
            Current Month
          </h2>
          <Button variant='primary' onClick={changeMonth}>
            Simulate Month End
          </Button>
        </div>
        <Row md={2} lg={4} className='g-4'>
          <Col>
            <Card
              className='h-100'
              style={{
                minWidth: '12rem',
                border: 'none',
                boxShadow: '5px 5px 15px rgb(0 0 0 / 0.2)',
              }}
            >
              <Card.Body className='py-3 text-center'>
                <BiUser style={{ fontSize: '55px' }} />
                <Card.Title className='my-0 fs-4 text-center mt-3'>
                  Employees
                </Card.Title>
              </Card.Body>
              <ListGroup.Item className='mb-3 text-center'>
                <p className='h1'>{employees.length}</p>
              </ListGroup.Item>
            </Card>
          </Col>
          <Col>
            <Card
              className='h-100'
              style={{
                minWidth: '12rem',
                border: 'none',
                boxShadow: '5px 5px 15px rgb(0 0 0 / 0.2)',
              }}
            >
              <Card.Body className='py-3 text-center'>
                <FaTasks style={{ fontSize: '55px' }} />
                <Card.Title className='my-0 fs-4 text-center mt-3'>
                  Total Tasks
                </Card.Title>
              </Card.Body>
              <ListGroup.Item className='mb-3 text-center'>
                <p className='h1'>
                  {completedTasksCurrentMonth.length + tasks.length}
                </p>
              </ListGroup.Item>
            </Card>
          </Col>
          <Col>
            <Card
              className='h-100'
              style={{
                minWidth: '12rem',
                border: 'none',
                boxShadow: '5px 5px 15px rgb(0 0 0 / 0.2)',
              }}
            >
              <Card.Body className='py-3 text-center'>
                <BiTask style={{ fontSize: '55px' }} />
                <Card.Title className='my-0 fs-4 text-center mt-3'>
                  Completed Tasks
                </Card.Title>
              </Card.Body>
              <ListGroup.Item className='mb-3 text-center'>
                <p className='h1'>{completedTasksCurrentMonth.length}</p>
              </ListGroup.Item>
            </Card>
          </Col>
          <Col>
            <Card
              className='h-100'
              style={{
                minWidth: '12rem',
                border: 'none',
                boxShadow: '5px 5px 15px rgb(0 0 0 / 0.2)',
              }}
            >
              <Card.Body className='py-3 text-center'>
                <BiTaskX style={{ fontSize: '55px' }} />
                <Card.Title className='my-0 fs-4 text-center mt-3'>
                  Uncompleted Tasks
                </Card.Title>
              </Card.Body>
              <ListGroup.Item className='mb-3 text-center'>
                <p className='h1'>{tasks.length}</p>
              </ListGroup.Item>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container>
        <h3 className='mb-4'>Top 5 Employees</h3>
        {!topEmployees.some((employee) => employee.completedTasks > 0) && (
          <p className='fs-4'>
            No enough data. At least one employee must have at least one
            completed task.
          </p>
        )}

        <Row xs={1} lg={2} xl={3} className='g-4'>
          {topEmployees.some((employee) => employee.completedTasks > 0) &&
            topEmployees.map((employee, idx) => {
              if (employee.completedTasks > 0)
                return (
                  <Col key={idx}>
                    <Card
                      className={`h-100 ${
                        idx === 0
                          ? 'border border-2 border-warning'
                          : ' border-0 '
                      }`}
                      style={{
                        minWidth: '12rem',
                        boxShadow: '5px 5px 15px rgb(0 0 0 / 0.2)',
                      }}
                    >
                      <Card.Body className='py-3 d-flex gap-4'>
                        <div className='text-center'>
                          <BiUser style={{ fontSize: '75px' }} />
                        </div>
                        <div>
                          <Card.Title className=' fs-3 text-start'>{`${
                            idx + 1
                          }. ${employee.firstName} ${
                            employee.lastName
                          }`}</Card.Title>
                          <Card.Text className='fs-5'>
                            Completed Tasks:{' '}
                            <span className='fw-bolder'>
                              {employee.completedTasks}
                            </span>
                          </Card.Text>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
            })}
        </Row>
      </Container>
    </>
  );
};

export default CurrentMonthStats;
