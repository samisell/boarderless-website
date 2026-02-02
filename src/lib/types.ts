/**
 * Data required for user registration.
 * Based on the API documentation.
 */
export interface RegisterUserData {
    username: string;
    email: string;
    password: string;
    password2: string;
}

export interface RegisterSuccessResponse {
    username: string;
    email: string;
}

/**
 * Data for user login.
 */
export interface LoginUserData {
    email: string;
    password: string;
}

/**
 * Successful login response with tokens.
 */
export interface LoginSuccessResponse {
    refresh: string;
    access: string;
}

/**
 * Data for verifying email with OTP.
 */
export interface VerifyEmailData {
    email: string;
    otp: string;
}

/**
 * Data for requesting a password reset.
 */
export interface RequestPasswordResetData {
    email: string;
}

/**
 * Data for confirming a password reset.
 */
export interface ConfirmPasswordResetData {
    email: string;
    otp: string;
    new_password: string;
}

/**
 * User profile data.
 */
export interface UserProfile {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_picture: string | null;
    country: string;
    bio: string;
    bundle_sid: string;
}

/**
 * Data for changing password.
 */
export interface ChangePasswordData {
    old_password: string;
    new_password: string;
    new_password2: string;
}

/**
 * Data for refreshing an access token.
 */
export interface RefreshTokenData {
    refresh: string;
}

/**
 * Response for a successful token refresh.
 */
export interface RefreshTokenResponse {
    access: string;
}

/**
 * Data for verifying a token.
 */
export interface VerifyTokenData {
    token: string;
}

export interface Wallet {
    id: number;
    user: number;
    balance: string;
}

export interface Transaction {
    id: number;
    wallet: number;
    transaction_type: 'credit' | 'debit';
    amount: string;
    status: 'completed' | 'pending' | 'failed';
    payment_method: string;
    reference: string;
    created_at: string;
}

export interface PaystackInitializationData {
    amount: number;
}

export interface PaystackInitializationResponse {
    status: boolean;
    message: string;
    data: {
        authorization_url: string;
        access_code: string;
        reference: string;
    };
}

export interface FlutterwaveInitializationData {
    amount: number;
    redirect_url: string;
}

export interface FlutterwaveInitializationResponse {
    status: string;
    message: string;
    data: {
        link: string;
    };
    tx_ref?: string; // Add the optional tx_ref field
}

export type Call = {
    id: number;
    call_type: 'inbound' | 'outbound' | 'missed';
    from_number: string;
    to_number: string;
    call_duration: string;
    created_at: string;
}

export type Activity = Transaction;