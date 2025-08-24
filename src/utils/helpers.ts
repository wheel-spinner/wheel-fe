/**
 * Check if a result is a winning prize
 */
export const isWinningPrize = (prizeKey: string): boolean => {
  const normalizedKey = prizeKey ? prizeKey.toUpperCase().trim() : "";

  // Check for losing patterns (matching backend logic)
  const losingPatterns = [
    /^TRY_AGAIN(_\d+)?$/, // TRY_AGAIN, TRY_AGAIN_1, TRY_AGAIN_5, etc.
    /^BETTER_LUCK(_\d+)?$/,
    /^NO_WIN(_\d+)?$/,
    /^TRY AGAIN( \d+)?$/, // TRY AGAIN, TRY AGAIN 1, etc.
  ];

  const isLoser = losingPatterns.some((pattern) => pattern.test(normalizedKey));
  return !isLoser;
};

/**
 * Generate a unique session ID
 */
export const generateSessionId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format a date for display
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Deep clone an object (for simple objects)
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (obj instanceof Array) {
    return obj.map((item) => deepClone(item)) as unknown as T;
  }

  if (typeof obj === "object") {
    const cloned = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }

  return obj;
};

/**
 * Calculate wheel segment angles for positioning
 */
export interface WheelSegmentAngle {
  startAngle: number;
  endAngle: number;
  midAngle: number;
}

export const calculateSegmentAngles = (
  segmentCount: number
): WheelSegmentAngle[] => {
  const anglePerSegment = 360 / segmentCount;
  const angles: WheelSegmentAngle[] = [];

  for (let i = 0; i < segmentCount; i++) {
    const startAngle = i * anglePerSegment;
    const endAngle = (i + 1) * anglePerSegment;
    const midAngle = startAngle + anglePerSegment / 2;

    angles.push({
      startAngle,
      endAngle,
      midAngle,
    });
  }

  return angles;
};

/**
 * Convert degrees to radians
 */
export const degreesToRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

/**
 * Convert radians to degrees
 */
export const radiansToDegrees = (radians: number): number => {
  return radians * (180 / Math.PI);
};

/**
 * Normalize angle to 0-360 range
 */
export const normalizeAngle = (angle: number): number => {
  while (angle < 0) angle += 360;
  while (angle >= 360) angle -= 360;
  return angle;
};

/**
 * Detect if the user is on an iPhone
 */
export const isIPhone = (): boolean => {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }

  // Check for iPhone in user agent
  const userAgent =
    navigator.userAgent || navigator.vendor || (window as any).opera;

  // iPhone detection - checks for iPhone specifically
  return /iPhone/i.test(userAgent);
};
