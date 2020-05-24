import React, { useState, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Layout } from '../components/ui/Layout';
import { Preloader } from '../components/ui/Preloader';
import { register } from '../redux/actions/authActions';
import {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
} from '../utils/formValidator';

const { Label, Group, Control } = Form;

export const Register: React.FC = () => {
  const { request, isLoading } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const handleRegister = (evt: FormEvent) => {
    evt.preventDefault();

    dispatch(register(email, password));
  };

  const cardStyles = {
    maxWidth: '500px',
  };

  if (isLoading && !request.errors.onLoad && !request.errors.onLogin) {
    return <Preloader />;
  }

  return (
    <Layout>
      <Container className="py-5 text-center">
        <Card className="mx-auto text-left w-100 p-3" style={cardStyles}>
          <div className="text-center">
            <h2 className="mb-3">Register</h2>
          </div>

          <Form onSubmit={handleRegister}>
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
              <Label htmlFor="password">Password</Label>
              <Control
                type="password"
                value={password}
                onChange={evt => setPassword(evt.target.value)}
                disabled={isLoading}
              />
            </Group>
            <Group>
              <Label htmlFor="email">Repeat password</Label>
              <Control
                type="password"
                value={passwordRepeat}
                onChange={evt => setPasswordRepeat(evt.target.value)}
                disabled={isLoading}
              />
            </Group>
            <Group className="py-3">
              Already have an account? <Link to="/login">Login</Link>
            </Group>
            {request.errors.onRegister && !isLoading && (
              <Alert variant="danger">{request.response}</Alert>
            )}
            <div className="text-center">
              <Button
                type="submit"
                disabled={
                  !(
                    validateEmail(email) &&
                    validatePassword(password) &&
                    validatePasswordMatch(password, passwordRepeat)
                  ) || isLoading
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
                Register
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </Layout>
  );
};
