import { action } from 'typesafe-actions';
import { ErrorTypes } from './types';

export const setError = (message?: string) =>
    action(ErrorTypes.SET_ERROR, message);

export const clearErrors = () => action(ErrorTypes.CLEAR_ERRORS);
