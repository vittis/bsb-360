import { Reducer } from 'redux';
import { ErrorState, ErrorTypes } from './types';

const INITIAL_STATE: ErrorState = {
    hasError: false,
};

const reducer: Reducer<ErrorState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ErrorTypes.SET_ERROR:
            return {
                hasError: true,
            };
        case ErrorTypes.CLEAR_ERROR:
            return {
                hasError: false,
            };
        default:
            return state;
    }
};

export default reducer;
