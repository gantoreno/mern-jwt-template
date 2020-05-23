import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { load } from '../../redux/actions/authActions';

export const GetAuthState: React.FC = ({ children }) => {
  const { user, request } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user && !request.errors.onLoad) {
      dispatch(load());
    }
  }, [dispatch, user, request.errors.onLoad]);

  return <>{children}</>;
};
