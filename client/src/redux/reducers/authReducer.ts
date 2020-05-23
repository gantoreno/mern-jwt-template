import { USER_LOADING, USER_LOADED } from '../actions/authActions.types';

interface InitialState {
  user: Object | null;
  isLoading: boolean;
  request: Request;
}

interface Request {
  success: boolean;
  response: string | null;
  errors: Errors;
}

interface Errors {
  onLogin: boolean;
  onRegister: boolean;
  onLoad: boolean;
}

const initialState: InitialState = {
  user: null,
  isLoading: true,
  request: {
    success: false,
    response: null,
    errors: {
      onLogin: false,
      onRegister: false,
      onLoad: false,
    },
  },
};

export const authReducer = (
  state: InitialState = initialState,
  action: any
): InitialState => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      const { user, request } = action.payload;

      return {
        user: user,
        isLoading: false,
        request: request,
      };
    default:
      return state;
  }
};
