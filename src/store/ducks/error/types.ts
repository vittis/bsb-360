/**
 * Action types
 */
export enum ErrorTypes {
    SET_ERROR = '@error/SET_ERROR',
    CLEAR_ERROR = '@error/CLEAR_ERROR',
}

/**
 * State type
 */
export interface ErrorState {
    readonly hasError: boolean;
}
