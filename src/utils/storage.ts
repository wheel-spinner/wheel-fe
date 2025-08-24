// Storage keys
export const STORAGE_KEYS = {
  USER_DATA: "wheel-spinner-user",
  SPIN_RESULT: "wheel-spinner-result",
  SESSION_ID: "wheel-spinner-session",
} as const;

// Safe localStorage operations
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      if (typeof window === "undefined") {
        return defaultValue;
      }

      const item = localStorage.getItem(key);
      if (item === null) {
        return defaultValue;
      }

      return JSON.parse(item);
    } catch (error) {
      console.warn(`Error reading from localStorage with key "${key}":`, error);
      return defaultValue;
    }
  },

  set: (key: string, value: any): void => {
    try {
      if (typeof window === "undefined") {
        return;
      }

      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error writing to localStorage with key "${key}":`, error);
    }
  },

  remove: (key: string): void => {
    try {
      if (typeof window === "undefined") {
        return;
      }

      localStorage.removeItem(key);
    } catch (error) {
      console.warn(
        `Error removing from localStorage with key "${key}":`,
        error
      );
    }
  },

  clear: (): void => {
    try {
      if (typeof window === "undefined") {
        return;
      }

      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.warn("Error clearing localStorage:", error);
    }
  },
};
