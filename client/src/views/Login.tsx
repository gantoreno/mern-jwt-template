import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Layout } from '../components/ui/Layout';
import { login } from '../redux/actions/authActions';
import { validateEmail, validatePassword } from '../utils/formValidator';

const { Label, Group, Control } = Form;

export const Login: React.FC = () => {
  const { request, isLoading } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (evt: FormEvent) => {
    evt.preventDefault();

    dispatch(login(email, password));
  };

  const cardStyles = {
    maxWidth: '500px',
  };

  return (
    <Layout>
      <Container className="py-5 text-center">
        <Card className="mx-auto text-left w-100 p-3" style={cardStyles}>
          <div className="text-center">
            <h2 className="mb-3">Login</h2>
          </div>

          <Form onSubmit={handleLogin}>
            <Group>
              <Label htmlFor="email">Email</Label>
              <Control
                type="email"
                value={email}
                onChange={evt => setEmail(evt.target.value)}
                disabled={isLoading}
              />
            </Group>
            <Group>
              <Label htmlFor="email">Password</Label>
              <Control
                type="password"
                value={password}
                onChange={evt => setPassword(evt.target.value)}
                disabled={isLoading}
              />
            </Group>
            <Group className="py-3">
              Don't have an account? <Link to="/register">Register</Link>
            </Group>
            {request.errors.onLogin && !isLoading && (
              <Alert variant="danger">{request.response}</Alert>
            )}
            <div className="text-center">
              <Button
                type="submit"
                disabled={
                  !(validateEmail(email) && validatePassword(password)) ||
                  isLoading
                }
              >
                {isLoading && (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{' '}
                  </>
                )}
                Login
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </Layout>
  );
};
