import { Reducer } from 'redux';
import { ErrorState, ErrorTypes } from './types';

const INITIAL_STATE: ErrorState = {
    requestError: false,
    message: null,
};

const reducer: Reducer<ErrorState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ErrorTypes.SET_ERROR:
            return {
                requestError: true,
                message: action.payload,
            };
        case ErrorTypes.CLEAR_ERRORS:
            return {
                requestError: false,
                message: null,
            };
        default:
            return state;
    }
};

export default reducer;
