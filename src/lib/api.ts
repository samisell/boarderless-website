import {
  RegisterUserData,
  RegisterSuccessResponse,
  LoginUserData,
  LoginSuccessResponse,
  VerifyEmailData,
  RequestPasswordResetData,
  ConfirmPasswordResetData,
  UserProfile,
  ChangePasswordData,
  RefreshTokenData,
  RefreshTokenResponse,
  VerifyTokenData,
  Wallet,
  Transaction,
  PaystackInitializationData,
  PaystackInitializationResponse,
  FlutterwaveInitializationData,
  FlutterwaveInitializationResponse,
  Call,
  Activity,
} from './types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_API_URL environment variable');
}

async function fetchWithAuth(url: string, options: RequestInit = {}, withAuth = true) {
  let accessToken = withAuth ? document.cookie.split('; ').find(row => row.startsWith('accessToken='))?.split('=')[1] ?? null : null;

  const makeRequest = async (token: string | null) => {
    const headers = new Headers(options.headers || {});
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    if (!(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }
    options.headers = headers;
    return fetch(url, options);
  };

  let response = await makeRequest(accessToken);

  if (response.status === 401 && withAuth) {
    const refreshTokenValue = document.cookie.split('; ').find(row => row.startsWith('refreshToken='))?.split('=')[1] ?? null;
    if (refreshTokenValue) {
      try {
        const refreshResponse = await fetch(`${BASE_URL}/users/token/refresh/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh: refreshTokenValue }),
        });

        if (refreshResponse.ok) {
          const { access } = await refreshResponse.json();
          document.cookie = `accessToken=${access}; path=/; max-age=86400; samesite=lax`;
          accessToken = access;
          response = await makeRequest(accessToken); // Retry the request with the new token
        } else {
          logoutUser();
          window.location.href = '/login';
        }
      } catch (error) {
        logoutUser();
        window.location.href = '/login';
      }
    }
  }

  return response;
}

/**
 * Registers a new user.
 * @param userData - The user's registration data.
 * @returns The newly created user's information.
 * @throws Will throw an error if the registration fails.
 */
export async function registerUser(userData: RegisterUserData): Promise<RegisterSuccessResponse> {
  const response = await fetchWithAuth(`${BASE_URL}/users/register/`, {
    method: 'POST',
    body: JSON.stringify(userData),
  }, false);

  if (!response.ok) {
    const errorData = await response.json();
    // Combine error messages into a single string
    const errorMessage = Object.values(errorData).flat().join(' ');
    throw new Error(errorMessage || 'Failed to register user.');
  }

  const data: RegisterSuccessResponse = await response.json();
  return data;
}

/**
 * Verifies a user's email with an OTP.
 */
export async function verifyEmail(verifyData: VerifyEmailData): Promise<{ message: string }> {
  const response = await fetchWithAuth(`${BASE_URL}/users/verify-email/`, {
    method: 'POST',
    body: JSON.stringify(verifyData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to verify email.');
  }

  return response.json();
}

/**
 * Fetches the user's dashboard data.
 */
export async function getDashboardData(): Promise<any> {
  const response = await fetchWithAuth(`${BASE_URL}/twilio/dashboard/`);
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data.');
  }
  return response.json();
}

/**
 * Fetches the user's recent activities.
 */
export async function getActivities(): Promise<{ wallet_balance: string; recent_transactions: Activity[]; active_numbers: number; total_calls: number; unread_messages: number; }> {
  const response = await fetchWithAuth(`${BASE_URL}/users/activities/`);
  if (!response.ok) {
    throw new Error('Failed to fetch activities.');
  }
  return response.json();
}

/**
 * Resends the verification OTP to a user's email.
 */
export async function resendOtp(emailData: { email: string }): Promise<{ message: string }> {
  const response = await fetchWithAuth(`${BASE_URL}/users/resend-otp/`, {
    method: 'POST',
    body: JSON.stringify(emailData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to resend OTP.');
  }

  return response.json();
}

/**
 * Logs in a user and returns access and refresh tokens.
 */
export async function loginUser(loginData: LoginUserData): Promise<LoginSuccessResponse> {
  console.log('Attempting to log in with BASE_URL:', BASE_URL);
  const response = await fetchWithAuth(`${BASE_URL}/users/login/`, {
    method: 'POST',
    body: JSON.stringify(loginData),
  }, false);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Login Error:', errorText);
    try {
      // Try to parse as JSON for structured errors
      const errorData = JSON.parse(errorText);
      const errorMessage = Object.values(errorData).flat().join(' ');
      throw new Error(errorMessage || 'Invalid credentials.');
    } catch (e) {
      // If not JSON, use the raw text
      throw new Error(errorText || 'Invalid credentials.');
    }
  }

  const data: LoginSuccessResponse = await response.json();
  if (data.access) {
    document.cookie = `accessToken=${data.access}; path=/; max-age=86400; samesite=lax`;
  }
  if (data.refresh) {
    document.cookie = `refreshToken=${data.refresh}; path=/; max-age=604800; samesite=lax`;
  }
  return data;
}

/**
 * Refreshes an access token using a refresh token.
 */
export async function refreshToken(data: RefreshTokenData): Promise<RefreshTokenResponse> {
  const response = await fetchWithAuth(`${BASE_URL}/users/token/refresh/`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to refresh token.');
  }

  return response.json();
}

/**
 * Verifies a token.
 */
export async function verifyToken(data: VerifyTokenData): Promise<void> {
  const response = await fetchWithAuth(`${BASE_URL}/users/token/verify/`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Token is invalid or expired.');
  }
}

/**
 * Makes a call from one number to another via Twilio.
 */
export async function makeCall(from_number: string, to_number: string): Promise<any> {
  const response = await fetchWithAuth(`${BASE_URL}/twilio/make-call/`, {
    method: 'POST',
    body: JSON.stringify({ from_number, to_number }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to make call.');
  }
  return response.json();
}

/**
 * Sends an SMS message via Twilio.
 */
export async function sendSms(from_number: string, to_number: string, body: string): Promise<any> {
  const response = await fetchWithAuth(`${BASE_URL}/twilio/send-sms/`, {
    method: 'POST',
    body: JSON.stringify({ from_number, to_number, body }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to send SMS.');
  }
  return response.json();
}

/**
 * Logs out a user by blacklisting their refresh token.
 */
export async function logoutUser(): Promise<void> {
  const refreshToken = document.cookie.split('; ').find(row => row.startsWith('refreshToken='))?.split('=')[1];
  if (refreshToken) {
    try {
      await fetchWithAuth(`${BASE_URL}/users/logout/`, {
        method: 'POST',
        body: JSON.stringify({ refresh: refreshToken }),
      });
    } catch (error) {
      console.error('Logout failed on server:', error);
    }
  }
  document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}

/**
 * Requests a password reset OTP.
 */
export async function requestPasswordReset(data: RequestPasswordResetData): Promise<{ message: string }> {
  const response = await fetchWithAuth(`${BASE_URL}/users/password-reset/`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to request password reset.');
  }

  return response.json();
}

/**
 * Confirms a password reset with an OTP and a new password.
 */
export async function confirmPasswordReset(data: ConfirmPasswordResetData): Promise<{ message: string }> {
  const response = await fetchWithAuth(`${BASE_URL}/users/password-reset/confirm/`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to confirm password reset.');
  }

  return response.json();
}

/**
 * Fetches the current user's profile.
 */
export async function getUserProfile(): Promise<UserProfile> {
  const response = await fetchWithAuth(`${BASE_URL}/users/profile/`);

  if (!response.ok) {
    throw new Error('Failed to fetch user profile.');
  }

  return response.json();
}

/**
 * Updates the user's profile.
 */
export async function updateUserProfile(
  data: Omit<Partial<UserProfile>, 'profile_picture'> & { profile_picture?: File | null }
): Promise<UserProfile> {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (key === 'profile_picture' && value instanceof File) {
        formData.append(key, value);
      } else if (key !== 'profile_picture') {
        formData.append(key, String(value));
      }
    }
  });

  const response = await fetchWithAuth(`${BASE_URL}/users/profile/`, {
    method: 'PATCH',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = Object.values(errorData).flat().join(' ');
    throw new Error(errorMessage || 'Failed to update profile.');
  }

  return response.json();
}

/**
 * Changes the authenticated user's password.
 */
export async function changePassword(data: ChangePasswordData): Promise<{ message: string }> {
  const response = await fetchWithAuth(`${BASE_URL}/users/change-password/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Change Password Error:', errorText);
    try {
      // Try to parse as JSON for structured errors
      const errorData = JSON.parse(errorText);
      const errorMessage = Object.values(errorData).flat().join(' ');
      throw new Error(errorMessage || 'Failed to change password.');
    } catch (e) {
      // If not JSON, use the raw text
      throw new Error(errorText || 'Failed to change password.');
    }
  }

  return response.json();
}

/**
 * Fetches the user's wallet.
 */
export async function getUserWallet(): Promise<Wallet> {
  const response = await fetchWithAuth(`${BASE_URL}/payments/wallet/`);
  if (!response.ok) {
    throw new Error('Failed to fetch wallet.');
  }
  return response.json();
}

/**
 * Lists user transactions.
 */
export async function listUserTransactions(): Promise<Transaction[]> {
  const response = await fetchWithAuth(`${BASE_URL}/payments/transactions/`);
  if (!response.ok) {
    throw new Error('Failed to fetch transactions.');
  }
  return response.json();
}

/**
 * Initializes a Paystack payment.
 */
export async function initializePaystackPayment(
  data: PaystackInitializationData
): Promise<PaystackInitializationResponse> {
  const response = await fetchWithAuth(`${BASE_URL}/payments/paystack/initialize/`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to initialize Paystack payment.');
  }
  return response.json();
}

/**
 * Initializes a Flutterwave payment.
 */
export async function initializeFlutterwavePayment(
  data: FlutterwaveInitializationData
): Promise<FlutterwaveInitializationResponse> {
  const tx_ref = `flw_tx_${Date.now()}`;
  const response = await fetchWithAuth(`${BASE_URL}/payments/flutterwave/initialize/`, {
    method: 'POST',
    body: JSON.stringify({ ...data, tx_ref }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to initialize Flutterwave payment.');
  }
  return response.json();
}

/**
 * Verifies a Paystack payment.
 */
export async function verifyPaystackPayment(data: { reference: string }): Promise<{ message: string, balance: string }> {
  const response = await fetchWithAuth(`${BASE_URL}/payments/paystack/verify/?reference=${data.reference}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to verify Paystack payment.');
  }
  return response.json();
}

/**
 * Verifies a Flutterwave payment.
 */
export async function verifyFlutterwavePayment(data: { transaction_id: string }): Promise<{ message: string, balance: string }> {
  const response = await fetchWithAuth(
    `${BASE_URL}/payments/flutterwave/verify/?transaction_id=${data.transaction_id}`
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to verify Flutterwave payment.');
  }
  return response.json();
}

/**
 * Searches for available Twilio numbers.
 */
export async function findAvailableNumbers(countryCode: string): Promise<any[]> {
  const response = await fetchWithAuth(`${BASE_URL}/twilio/search/?country_code=${countryCode}`);
  if (!response.ok) {
    throw new Error('Failed to find available numbers.');
  }
  return response.json();
}

/**
 * Fetches the list of supported Twilio countries.
 */
export async function getTwilioCountries(): Promise<any[]> {
  const response = await fetchWithAuth(`${BASE_URL}/twilio/countries/`);
  if (!response.ok) {
    throw new Error('Failed to fetch countries.');
  }
  return response.json();
}

/**
 * Resubscribes to a Twilio number subscription.
 */
export async function resubscribeNumber(numberId: number, months: number): Promise<any> {
  const response = await fetchWithAuth(`${BASE_URL}/twilio/resubscribe/${numberId}/`, {
    method: 'POST',
    body: JSON.stringify({ months }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to resubscribe to number.');
  }
  return response.json();
}

/**
 * Purchases a Twilio number.
 */
export async function purchaseNumber(phoneNumber: string): Promise<any> {
  const response = await fetchWithAuth(`${BASE_URL}/twilio/purchase/`, {
    method: 'POST',
    body: JSON.stringify({ phone_number: phoneNumber }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to purchase number.');
  }
  return response.json();
}

/**
 * Fetches the user's purchased Twilio numbers.
 */
export async function getNumbers(): Promise<any[]> {
  const response = await fetchWithAuth(`${BASE_URL}/twilio/my-numbers/`);
  if (!response.ok) {
    throw new Error('Failed to fetch numbers.');
  }
  return response.json();
}

/**
 * Fetches the user's call logs.
 */
export async function getCalls(): Promise<Call[]> {
  const response = await fetchWithAuth(`${BASE_URL}/twilio/calls/`);
  if (!response.ok) {
    throw new Error('Failed to fetch calls.');
  }
  return response.json();
}

/**
 * Fetches the user's conversations.
 */
export async function getConversations(): Promise<any[]> {
  const response = await fetchWithAuth(`${BASE_URL}/twilio/conversations/`);
  if (!response.ok) {
    throw new Error('Failed to fetch conversations.');
  }
  return response.json();
}

/**
 * Fetches messages for a specific conversation.
 */
export async function getMessages(conversationId: string): Promise<any[]> {
  const response = await fetchWithAuth(`${BASE_URL}/twilio/conversations/${conversationId}/messages/`);
  if (!response.ok) {
    throw new Error('Failed to fetch messages.');
  }
  return response.json();
}

/**
 * Sends an OTP to the user's registered phone number.
 */
export async function sendOtp(): Promise<{ message: string }> {
  const response = await fetchWithAuth(`${BASE_URL}/users/send-otp/`, {
    method: 'POST',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to send OTP.');
  }

  return response.json();
}