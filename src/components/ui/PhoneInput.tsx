import React from "react";
import PhoneInputComponent from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface PhoneInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  label = "Phone Number",
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  placeholder = "Enter phone number",
}) => {
  const handleChange = (value: string | undefined) => {
    onChange(value || "");
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <PhoneInputComponent
        value={value}
        onChange={handleChange}
        defaultCountry="QA"
        international
        countryCallingCodeEditable={false}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          phone-input-field
          ${error ? "phone-input-error" : ""}
          ${disabled ? "phone-input-disabled" : ""}
        `}
        inputClassName="phone-number-input"
        containerClassName="phone-input-container"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};