import React from 'react';
import { Container, Row, Col, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-dark text-white vh-100">
          <Navbar.Brand href="/" className="text-center text-white mt-3 mb-4">
            Dashboard
          </Navbar.Brand>
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link as={Link} to="/dashboard" className="text-white">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/profile" className="text-white">Profile</Nav.Link>
            <Nav.Link as={Link} to="/settings" className="text-white">Settings</Nav.Link>
            <Nav.Link as={Link} to="/logout" className="text-white">Logout</Nav.Link>
          </Nav>
        </Col>

        {/* Main Content Area */}
        <Col md={10}>
          {/* Topbar */}
          <Navbar bg="light" expand="lg" className="shadow-sm">
            <Navbar.Collapse>
              <Row className="w-100">
                <Col className="d-flex justify-content-between align-items-center">
                  <h2>Welcome to the Dashboard</h2>
                  <Button variant="outline-danger">Logout</Button>
                </Col>
              </Row>
            </Navbar.Collapse>
          </Navbar>

          {/* Dashboard Content */}
          <Container className="mt-4">
            <Row>
              <Col md={4}>
                <div className="card p-3 shadow-sm mb-4">
                  <h4>Total Sales</h4>
                  <p>$10,000</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="card p-3 shadow-sm mb-4">
                  <h4>Total Users</h4>
                  <p>200</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="card p-3 shadow-sm mb-4">
                  <h4>Pending Tasks</h4>
                  <p>15</p>
                </div>
              </Col>
            </Row>
            {/* Add more widgets or content sections */}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
