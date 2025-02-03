import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link,  useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate =useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      });

      // Assuming the response contains a token
      const { token } = response.data;

      // Save the token in localStorage
      localStorage.setItem('authToken', token);

      // Redirect user to the dashboard or home page after successful login
      
        navigate('/signup');

    } catch (err) {
      
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2 className="text-center mb-4">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className='d-flex justify-content-between align-items-center'>
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>

              <Button variant="primary" type="submit" className="w-100 mt-3">
                Login
              </Button>
              <div className="mt-3">
                <p className="text-center">
                  Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
