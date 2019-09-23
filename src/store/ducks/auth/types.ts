/**
 * Action types
 */
export enum AuthTypes {
    AUTH_REQUEST = '@auth/AUTH_REQUEST',
    AUTH_SUCCCESS = '@auth/AUTH_SUCCCESS',
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
    refreshToken: string;
}

/**
 * State type
 */
export interface AuthState {
    readonly user: User;
    readonly token: string;
    readonly refreshToken: string;
    readonly isAuthenticated: boolean;
    readonly loading: boolean;
    readonly error: boolean;
}
