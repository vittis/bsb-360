/**
 * Action types
 */
export enum AuthTypes {
    AUTH_REQUEST = '@auth/SIGN_IN_REQUEST',
    AUTH_SUCCCES = '@auth/SIGN_IN_SUCCCES',
    AUTH_FAILURE = '@auth/SIGN_IN_FAILURE',
}

/**
 * Data types
 */
export interface User {
    email: string;
    token: string;
}

export interface AuthDTO {
    email: string;
    password: string;
}

export interface AuthRO {
    user: User;
    token: string;
}

/**
 * State type
 */
export interface AuthState {
    readonly user: User;
    readonly token: string;
    readonly isAuthenticated: boolean;
    readonly loading: boolean;
    readonly error: boolean;
}
