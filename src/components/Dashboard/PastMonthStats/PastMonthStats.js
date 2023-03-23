///Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

///Icons
import { BiUser, BiTask, BiTaskX } from 'react-icons/bi';
import { FaTasks } from 'react-icons/fa';

///Contexts
import PastMonthContext from '../../../contexts/PastMonthContext';

///Hooks
import React, { useContext } from 'react';

const PastMonthStats = ({}) => {
  const { pastMonth } = useContext(PastMonthContext);

  return (
    <>
      <Container className='py-5'>
        <h2 className='my-5'>Past Month</h2>
        {pastMonth.topEmployees.length < 1 ? (
          <p className='fs-4'>
            Statistics for the past month will load on the end of the current
            month. Click button in the top right corner to simulate end of the
            current month.
          </p>
        ) : (
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
                  <p className='h1'>{pastMonth.employees}</p>
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
                  <p className='h1'>{pastMonth.totalTasks}</p>
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
                  <p className='h1'>{pastMonth.completedTasks}</p>
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
                  <p className='h1'>{pastMonth.uncompletedTasks}</p>
                </ListGroup.Item>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
      <Container className='pb-5'>
        {pastMonth.topEmployees.length > 0 && (
          <>
            <h3 className='mb-4'>Top 5 Employees</h3>
            {!pastMonth.topEmployees.some(
              (employee) => employee.completedTasks > 0
            ) && (
              <p className='fs-4'>
                No enough data. At least one employee must have at least one
                completed task.
              </p>
            )}
          </>
        )}

        <Row xs={1} lg={2} xl={3} className='g-4'>
          {pastMonth.topEmployees.some(
            (employee) => employee.completedTasks > 0
          ) &&
            pastMonth.topEmployees.map((employee, idx) => {
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

export default PastMonthStats;
