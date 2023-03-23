///Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

///Components
import TaskCard from '../TaskCard/TaskCard';

///Contexts
import TasksContext from '../../../contexts/TasksContext';

///Hooks
import React, { useContext } from 'react';

const TasksList = ({ setEditMode }) => {
  const { tasks } = useContext(TasksContext);

  return (
    <Container className='py-5'>
      <Row md={2} lg={3} xxl={4} className='g-4'>
        {tasks.map(({ title, description, assignee, date }, idx) => {
          return (
            <Col key={idx}>
              <TaskCard
                title={title}
                description={description}
                assignee={assignee}
                date={date}
                taskIdx={idx}
                setEditMode={setEditMode}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default TasksList;
