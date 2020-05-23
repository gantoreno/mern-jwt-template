import { combineReducers, Reducer } from 'redux';
import { authReducer } from './authReducer';

export const rootReducer: Reducer = combineReducers({ auth: authReducer });
