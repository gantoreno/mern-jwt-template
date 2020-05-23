import React from 'react';
import { Spinner } from 'react-bootstrap';

export const Preloader: React.FC = () => {
  const spinnerStyles = {
    width: '5rem',
    height: '5rem',
  };

  return (
    <div className="d-flex w-100 h-100 justify-content-center align-items-center">
      <Spinner animation="border" style={spinnerStyles} variant="primary" />
    </div>
  );
};
