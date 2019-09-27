/**
 * Action types
 */
export enum ErrorTypes {
    SET_ERROR = '@error/SET_ERROR',
    CLEAR_ERRORS = '@error/CLEAR_ERRORS',
}

/**
 * State type
 */
export interface ErrorState {
    readonly requestError: boolean;
    readonly message: string;
}
