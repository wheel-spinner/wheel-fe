import React, { useState } from "react";
import { type UserRegistration, type FormErrors } from "../../types";
import { useUserRegistration, useFormValidation } from "../../hooks";
import { Button, Input, Alert, PhoneInput } from "../ui";
import { normalizeEmail, normalizeName } from "../../utils/validation";
import SubmitSvg from "../../assets/submit.svg";
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
        // Only trim leading/trailing spaces, allow natural typing of spaces
        normalizedValue = value.replace(/^\s+/, ""); // Remove leading spaces only
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

    // Apply final normalization before validation and submission
    const normalizedFormData = {
      ...formData,
      firstName: normalizeName(formData.firstName),
      lastName: normalizeName(formData.lastName),
    };

    // Validate form with normalized data
    const validationErrors = validateRegistrationForm(normalizedFormData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await register(normalizedFormData);
      onSuccess(normalizedFormData, result.userId);
    } catch (err) {
      // Error is handled by the hook
      console.error("Registration error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert type="error" message={error} onClose={clearError} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full">
          <label className="block text-sm font-poppins font-semibold text-[#543584] mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            placeholder="Enter your first name"
            required
            disabled={disabled || loading}
            maxLength={50}
            className="block w-full px-3 py-2 border-2 border-[#543584] rounded-md bg-transparent placeholder-[#543584]/50 text-[#543584] font-poppins focus:outline-none focus:ring-2 focus:ring-[#543584] focus:border-[#543584] disabled:opacity-50"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.firstName}
            </p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-sm font-poppins font-semibold text-[#543584] mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            placeholder="Enter your last name"
            required
            disabled={disabled || loading}
            maxLength={50}
            className="block w-full px-3 py-2 border-2 border-[#543584] rounded-md bg-transparent placeholder-[#543584]/50 text-[#543584] font-poppins focus:outline-none focus:ring-2 focus:ring-[#543584] focus:border-[#543584] disabled:opacity-50"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div className="w-full">
        <label className="block text-sm font-poppins font-semibold text-[#543584] mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="Enter your email address"
          required
          disabled={disabled || loading}
          autoComplete="email"
          className="block w-full px-3 py-2 border-2 border-[#543584] rounded-md bg-transparent placeholder-[#543584]/50 text-[#543584] font-poppins focus:outline-none focus:ring-2 focus:ring-[#543584] focus:border-[#543584] disabled:opacity-50"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div className="w-full registration-phone-input">
        <label className="block text-sm font-poppins font-semibold text-[#543584] mb-1">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <PhoneInput
          label=""
          value={formData.phone}
          onChange={(value) => handleInputChange("phone", value)}
          error={errors.phone}
          placeholder="Enter your phone number"
          required
          disabled={disabled || loading}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-[#00A4C2] hover:bg-[#00A4C2]/90 border-none"
        loading={loading}
        disabled={disabled}
      >
        {loading ? (
          "Submitting..."
        ) : (
          <>
            <img src={SubmitSvg} alt="Submit" className="w-5 h-5 mr-2" />
            <span className="font-handcaps font-bold">Submit!</span>
          </>
        )}
      </Button>

      <p className="text-sm text-[#543584] font-poppins font-bold text-center">
        By registering, you agree to participate in the wheel spin. One entry
        per person.
      </p>
    </form>
  );
};
