import { useState, useEffect } from "react";
import { type WheelConfig } from "../types";
import { WheelService } from "../services";

interface UseWheelConfigReturn {
  wheelConfig: WheelConfig | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useWheelConfig = (): UseWheelConfigReturn => {
  const [wheelConfig, setWheelConfig] = useState<WheelConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWheelConfig = async () => {
    try {
      setLoading(true);
      setError(null);
      const config = await WheelService.getWheelConfig();
      setWheelConfig(config);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to load wheel configuration";
      setError(errorMessage);
      console.error("Error fetching wheel config:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWheelConfig();
  }, []);

  return {
    wheelConfig,
    loading,
    error,
    refetch: fetchWheelConfig,
  };
};
