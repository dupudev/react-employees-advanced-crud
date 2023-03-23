///Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

///Components
import CompletedTaskCard from '../CompletedTaskCard/CompletedTaskCard';

///Contexts
import CompletedTasksContext from '../../../contexts/CompletedTasksContext';

///Hooks
import React, { useContext, useState } from 'react';

const CompletedTasksList = () => {
  const { completedTasks, completedTasksCurrentMonth } = useContext(
    CompletedTasksContext
  );
  const [tasksToShow, setTasksToShow] = useState('Current Month');

  return (
    <Container className='py-5 mt-5'>
      <div className='mb-5 d-flex flex-column flex-sm-row justify-content-between gap-4 '>
        <h2 className='m-0'>Completed Tasks</h2>
        <Form.Select
          style={{ width: '180px' }}
          value={tasksToShow}
          onChange={(event) => setTasksToShow(event.target.value)}
        >
          <option>All</option>
          <option>Current Month</option>
        </Form.Select>
      </div>

      {tasksToShow === 'All' ? (
        <Row md={2} lg={3} xxl={4} className='g-4'>
          {completedTasks.map(({ title, description, assignee, date }, idx) => {
            return (
              <Col key={idx}>
                <CompletedTaskCard
                  title={title}
                  description={description}
                  assignee={assignee}
                  date={date}
                  taskIdx={idx}
                />
              </Col>
            );
          })}
        </Row>
      ) : (
        <>
          {completedTasksCurrentMonth.length === 0 && (
            <p className='fs-4'>
              There is no completed tasks for the current month.
            </p>
          )}

          <Row md={2} lg={3} xxl={4} className='g-4'>
            {completedTasksCurrentMonth.map(
              ({ title, description, assignee, date }, idx) => {
                return (
                  <Col key={idx}>
                    <CompletedTaskCard
                      title={title}
                      description={description}
                      assignee={assignee}
                      date={date}
                      taskIdx={idx}
                    />
                  </Col>
                );
              }
            )}
          </Row>
        </>
      )}
    </Container>
  );
};

export default CompletedTasksList;
