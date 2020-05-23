import axios from 'axios';
import { USER_LOADING, USER_LOADED } from './authActions.types';

export const login = (email: string, password: string) => async (
  dispatch: Function
) => {
  try {
    dispatch({ type: USER_LOADING });

    const res = await axios.post('/api/auth/login', { email, password });
    const { success, user, response } = res.data;

    dispatch({
      type: USER_LOADED,
      payload: {
        user: user,
        request: {
          success: success,
          response: response,
          errors: { onLogin: false, onRegister: false, onLoad: false },
        },
      },
    });
  } catch (e) {
    const { success, user, response } = e.response.data;

    dispatch({
      type: USER_LOADED,
      payload: {
        user: user,
        request: {
          success: success,
          response: response,
          errors: { onLogin: true, onRegister: false, onLoad: false },
        },
      },
    });
  }
};

export const register = (email: string, password: string) => async (
  dispatch: Function
) => {
  try {
    dispatch({ type: USER_LOADING });

    const res = await axios.post('/api/auth/register', { email, password });
    const { success, user, response } = res.data;

    dispatch({
      type: USER_LOADED,
      payload: {
        user: user,
        request: {
          success: success,
          response: response,
          errors: { onLogin: false, onRegister: false, onLoad: false },
        },
      },
    });
  } catch (e) {
    const { success, user, response } = e.response.data;

    dispatch({
      type: USER_LOADED,
      payload: {
        user: user,
        request: {
          success: success,
          response: response,
          errors: { onLogin: false, onRegister: true, onLoad: false },
        },
      },
    });
  }
};

export const logout = () => async (dispatch: Function) => {
  try {
    dispatch({ type: USER_LOADING });

    const res = await axios.post(
      '/api/auth/logout',
      {},
      { withCredentials: true }
    );
    const { success, user, response } = res.data;

    dispatch({
      type: USER_LOADED,
      payload: {
        user: user,
        request: {
          success: success,
          response: response,
          errors: { onLogin: false, onRegister: false, onLoad: false },
        },
      },
    });
  } catch (e) {
    const { success, user, response } = e.response.data;

    dispatch({
      type: USER_LOADED,
      payload: {
        user: user,
        request: {
          success: success,
          response: response,
          errors: { onLogin: false, onRegister: false, onLoad: false },
        },
      },
    });
  }
};

export const load = () => async (dispatch: Function, getState: Function) => {
  try {
    dispatch({ type: USER_LOADING });

    const res = await axios.get('/api/auth/me', { withCredentials: true });
    const { success, user, response } = res.data;

    dispatch({
      type: USER_LOADED,
      payload: {
        user: user,
        request: {
          success: success,
          response: response,
          errors: { onLogin: false, onRegister: false, onLoad: false },
        },
      },
    });
  } catch (e) {
    const { success, user } = e.response.data;
    const { auth } = getState();

    dispatch({
      type: USER_LOADED,
      payload: {
        user: user,
        request: {
          success: success,
          response: auth.request.response,
          errors: {
            onLogin: auth.request.errors.onLogin,
            onRegister: auth.request.errors.onRegister,
            onLoad: true,
          },
        },
      },
    });
  }
};
