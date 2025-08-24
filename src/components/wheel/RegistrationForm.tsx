import React, { useState } from "react";
import { type UserRegistration, type FormErrors } from "../../types";
import { useUserRegistration, useFormValidation } from "../../hooks";
import { Button, Input, Alert, PhoneInput } from "../ui";
import {
  normalizeEmail,
  normalizeName,
} from "../../utils/validation";
import "../../styles/phone-input.css";

interface RegistrationFormProps {
  onSuccess: (userData: UserRegistration, userId: string) => void;
  disabled?: boolean;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSuccess,
  disabled = false,
}) => {
  const [formData, setFormData] = useState<UserRegistration>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const { register, loading, error, clearError } = useUserRegistration();
  const { validateRegistrationForm } = useFormValidation();

  const handleInputChange = (field: keyof UserRegistration, value: string) => {
    let normalizedValue = value;

    // Apply normalization based on field type
    switch (field) {
      case "firstName":
      case "lastName":
        normalizedValue = normalizeName(value);
        break;
      case "email":
        normalizedValue = normalizeEmail(value);
        break;
      case "phone":
        normalizedValue = value; // Phone input component handles formatting
        break;
    }

    setFormData((prev) => ({ ...prev, [field]: normalizedValue }));

    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    // Clear general error
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateRegistrationForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await register(formData);
      onSuccess(formData, result.userId);
    } catch (err) {
      // Error is handled by the hook
      console.error("Registration error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert type="error" message={error} onClose={clearError} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          value={formData.firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
          error={errors.firstName}
          placeholder="Enter your first name"
          required
          disabled={disabled || loading}
          maxLength={50}
        />

        <Input
          label="Last Name"
          type="text"
          value={formData.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
          error={errors.lastName}
          placeholder="Enter your last name"
          required
          disabled={disabled || loading}
          maxLength={50}
        />
      </div>

      <Input
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
        error={errors.email}
        placeholder="Enter your email address"
        required
        disabled={disabled || loading}
        autoComplete="email"
      />

      <PhoneInput
        label="Phone Number"
        value={formData.phone}
        onChange={(value) => handleInputChange("phone", value)}
        error={errors.phone}
        placeholder="Enter your phone number"
        required
        disabled={disabled || loading}
      />

      <Button
        type="submit"
        size="lg"
        className="w-full"
        loading={loading}
        disabled={disabled}
      >
        {loading ? "Submitting..." : "Submit!"}
      </Button>

      <p className="text-sm text-gray-500 text-center">
        By registering, you agree to participate in the wheel spin. One entry
        per person.
      </p>
    </form>
  );
};
