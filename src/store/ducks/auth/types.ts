/**
 * Action types
 */
export enum AuthTypes {
    AUTH_REQUEST = '@auth/AUTH_REQUEST',
    AUTH_SUCCCES = '@auth/AUTH_SUCCCES',
    AUTH_FAILURE = '@auth/AUTH_FAILURE',
    SIGN_OUT = '@auth/SIGN_OUT',
}

/**
 * Data types
 */
export interface User {
    email: string;
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
