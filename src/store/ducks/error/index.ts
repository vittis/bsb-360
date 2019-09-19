import { Reducer } from 'redux';
import { ErrorState, ErrorTypes } from './types';

const INITIAL_STATE: ErrorState = {
    requestError: false,
};

const reducer: Reducer<ErrorState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ErrorTypes.SET_ERROR:
            return {
                requestError: true,
            };
        case ErrorTypes.CLEAR_ERROR:
            console.log('clear this shit');
            return {
                requestError: false,
            };
        default:
            return state;
    }
};

export default reducer;
