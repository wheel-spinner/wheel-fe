// User types
export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  hasSpun: boolean;
  isWinner: boolean;
  result?: SpinResult;
}

export interface UserRegistration {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface RegistrationResponse {
  userId: string;
  hasSpun: boolean;
  isWinner?: boolean;
  result?: SpinResult;
  message: string;
}

// Wheel types
export interface WheelSegment {
  key: string;
  label: string;
}

export interface WheelConfig {
  segments: WheelSegment[];
}

// Spin types
export interface SpinRequest {
  userId: string;
}

export interface SpinResult {
  key: string;
  label: string;
  isWinner: boolean;
}

export interface SpinResponse {
  success?: boolean;
  result: SpinResult;
  spinAttemptId: string;
  prizeClaimId?: string;
  hasSpun: boolean;
  error?: string;
  message?: string;
}

// API types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  error: string;
  message: string;
  details?: any[];
}

// App state types
export interface AppState {
  user: User | null;
  wheelConfig: WheelConfig | null;
  isLoading: boolean;
  error: string | null;
}

export interface WheelSpinState {
  isSpinning: boolean;
  hasSpun: boolean;
  result: SpinResult | null;
  showResult: boolean;
}

// Form validation types
export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}
