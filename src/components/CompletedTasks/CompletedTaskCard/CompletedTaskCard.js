///Bootstrap
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

///Icons
import { BiTask } from 'react-icons/bi';

///Hooks
import React from 'react';

const CompletedTaskCard = ({ title, description, assignee, date }) => {
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
          <div className='text-center align-self-center text-success'>
            <BiTask style={{ fontSize: '95px' }} />
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
          <p className='mb-1 text-muted'>Completion date:</p>
          <p className='m-0'>{date}</p>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default CompletedTaskCard;
