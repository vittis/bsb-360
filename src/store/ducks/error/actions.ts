import { action } from 'typesafe-actions';
import { ErrorTypes } from './types';

export const setError = () => action(ErrorTypes.SET_ERROR);

export const clearError = () => action(ErrorTypes.CLEAR_ERROR);
