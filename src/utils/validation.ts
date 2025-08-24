import { isValidPhoneNumber } from 'libphonenumber-js';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validatePhone = (phone: string): boolean => {
  // If phone is empty, it's not valid
  if (!phone || phone.trim() === '') {
    return false;
  }
  
  // Use libphonenumber-js to validate international phone numbers
  try {
    return isValidPhoneNumber(phone);
  } catch {
    return false;
  }
};

export const validateName = (name: string): boolean => {
  // Allow letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  return name.trim().length >= 2 && nameRegex.test(name.trim());
};

export const normalizePhone = (phone: string): string => {
  // Remove all non-digits
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX for display if US number
  if (digitsOnly.length === 10) {
    return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
  } else if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
    return `+1 (${digitsOnly.slice(1, 4)}) ${digitsOnly.slice(4, 7)}-${digitsOnly.slice(7)}`;
  }
  
  return phone; // Return original if not standard format
};

export const normalizeEmail = (email: string): string => {
  return email.toLowerCase().trim();
};

export const normalizeName = (name: string): string => {
  return name.trim().replace(/\s+/g, ' '); // Replace multiple spaces with single space
};