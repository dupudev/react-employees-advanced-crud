///Bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

///Hooks
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <Navbar
      collapseOnSelect
      expand='md'
      bg='primary'
      variant='dark'
      className='fixed-top'
    >
      <Container>
        <Navbar.Brand as={Link} to='/' href='/'>
          Employees App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ms-auto text-white gap-3'>
            <Nav.Link as={Link} to='/' href='/'>
              Employees
            </Nav.Link>
            <Nav.Link as={Link} to='/tasks' href='/tasks'>
              Active Tasks
            </Nav.Link>
            <Nav.Link as={Link} to='/completed' href='/completed'>
              Completed Tasks
            </Nav.Link>
            <Nav.Link as={Link} to='/dashboard' href='/dashboard'>
              Dashboard
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
