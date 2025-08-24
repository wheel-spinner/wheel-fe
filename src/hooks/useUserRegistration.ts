import { useState } from "react";
import {
  type UserRegistration,
  type RegistrationResponse,
  type FormErrors,
} from "../types";
import { UserService } from "../services";

interface UseUserRegistrationReturn {
  register: (userData: UserRegistration) => Promise<RegistrationResponse>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useUserRegistration = (): UseUserRegistrationReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (
    userData: UserRegistration
  ): Promise<RegistrationResponse> => {
    try {
      setLoading(true);
      setError(null);

      const result = await UserService.register(userData);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Registration failed";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    register,
    loading,
    error,
    clearError,
  };
};

// Validation utility hook
export const useFormValidation = () => {
  const validateRegistrationForm = (userData: UserRegistration): FormErrors => {
    const errors: FormErrors = {};

    // First name validation
    if (!userData.firstName.trim()) {
      errors.firstName = "First name is required";
    } else if (userData.firstName.length < 2) {
      errors.firstName = "First name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s'-]+$/.test(userData.firstName)) {
      errors.firstName = "First name contains invalid characters";
    }

    // Last name validation
    if (!userData.lastName.trim()) {
      errors.lastName = "Last name is required";
    } else if (userData.lastName.length < 2) {
      errors.lastName = "Last name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s'-]+$/.test(userData.lastName)) {
      errors.lastName = "Last name contains invalid characters";
    }

    // Email validation
    if (!userData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!userData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(userData.phone)) {
      errors.phone = "Please enter a valid phone number";
    } else if (userData.phone.replace(/\D/g, "").length < 10) {
      errors.phone = "Phone number must be at least 10 digits";
    }

    return errors;
  };

  return { validateRegistrationForm };
};
