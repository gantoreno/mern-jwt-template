import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Layout } from '../components/ui/Layout';
import { Preloader } from '../components/ui/Preloader';

export const Home: React.FC = () => {
  const { user, isLoading } = useSelector((state: any) => state.auth);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <Layout>
      <Container className="py-5">
        <h1>Home</h1>

        {user && (
          <p>
            Welcome back! <code>{JSON.stringify(user)}</code>
          </p>
        )}
        {!user && <p>User not authenticated</p>}
      </Container>
    </Layout>
  );
};
