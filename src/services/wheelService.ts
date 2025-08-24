import { apiClient } from "./api";
import { type WheelConfig } from "../types";

export class WheelService {
  /**
   * Get the public wheel configuration
   * Returns only segment labels and keys (no weights)
   */
  static async getWheelConfig(): Promise<WheelConfig> {
    return apiClient.get<WheelConfig>("/wheel");
  }
}

export default WheelService;
