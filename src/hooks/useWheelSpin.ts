import { useState, useCallback } from "react";
import type { SpinResponse, WheelSpinState } from "../types";
import { SpinService } from "../services";

interface UseWheelSpinReturn extends WheelSpinState {
  performSpin: (userId: string) => Promise<SpinResponse>;
  resetSpin: () => void;
  error: string | null;
  clearError: () => void;
}

export const useWheelSpin = (): UseWheelSpinReturn => {
  const [state, setState] = useState<WheelSpinState>({
    isSpinning: false,
    hasSpun: false,
    result: null,
    showResult: false,
  });
  const [error, setError] = useState<string | null>(null);

  const performSpin = useCallback(
    async (userId: string): Promise<SpinResponse> => {
      try {
        setState((prev) => ({
          ...prev,
          isSpinning: true,
          showResult: false,
        }));
        setError(null);

        const result = await SpinService.performSpin(userId);

        setState((prev) => ({
          ...prev,
          isSpinning: false,
          hasSpun: true,
          result: result.result,
          showResult: true,
        }));

        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Spin failed";
        setError(errorMessage);

        setState((prev) => ({
          ...prev,
          isSpinning: false,
        }));

        throw err;
      }
    },
    []
  );

  const resetSpin = useCallback(() => {
    setState({
      isSpinning: false,
      hasSpun: false,
      result: null,
      showResult: false,
    });
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    ...state,
    performSpin,
    resetSpin,
    error,
    clearError,
  };
};
