// App configuration constants
export const APP_CONFIG = {
  APP_NAME: "Wheel Spinner",
  VERSION: "1.0.0",
  API_TIMEOUT: 10000, // 10 seconds
  SPIN_DURATION: 5000, // 5 seconds for wheel animation (matches spinDuration prop)
  RESULT_DISPLAY_DELAY: 500, // Delay before showing result after spin
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection and try again.",
  VALIDATION_ERROR: "Please check your input and try again.",
  ALREADY_SPUN: "You have already participated in this wheel spin.",
  WHEEL_CONFIG_ERROR:
    "Unable to load wheel configuration. Please refresh the page.",
  REGISTRATION_ERROR: "Registration failed. Please try again.",
  SPIN_ERROR: "Spin failed. Please try again.",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  REGISTRATION_SUCCESS: "Registration successful! You can now spin the wheel.",
  SPIN_SUCCESS: "Congratulations! Check your result below.",
} as const;

// Prize types (matching backend)
export const PRIZE_TYPES = {
  LIP_FILLER_1ML: "LIP_FILLER_1ML",
  BOTOX_FOREHEAD: "BOTOX_FOREHEAD",
  CHEEKS_FILLERS_2ML: "CHEEKS_FILLERS_2ML",
  DISCOUNT_20: "DISCOUNT_20",
  DISCOUNT_10: "DISCOUNT_10",
  LASER_FULL_BODY: "LASER_FULL_BODY",
  FACE_LASER_CARBON: "FACE_LASER_CARBON",
  TRY_AGAIN: "TRY_AGAIN",
} as const;

// Colors for wheel segments (can be customized)
export const WHEEL_COLORS = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Blue
  "#96CEB4", // Green
  "#FFEAA7", // Yellow
  "#DDA0DD", // Plum
  "#98D8C8", // Mint
  "#F7DC6F", // Light Yellow
  "#BB8FCE", // Light Purple
  "#85C1E9", // Light Blue
] as const;

// Animation settings
export const ANIMATION_CONFIG = {
  WHEEL_SPIN_DURATION: 15000, // 15 seconds for a long, realistic spin
  WHEEL_SPIN_EASING: "cubic-bezier(0.17, 0.67, 0.12, 0.99)", // More realistic deceleration curve
  RESULT_FADE_IN_DURATION: 2500,
  CONFETTI_DURATION: 3000,
  // Additional rotations to make the spin look more realistic
  EXTRA_ROTATIONS: 8, // Number of full rotations before landing on target
} as const;
