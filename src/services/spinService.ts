import { apiClient } from "./api";
import type { SpinRequest, SpinResponse } from "../types";

export class SpinService {
  /**
   * Perform a spin for the given user
   */
  static async performSpin(userId: string): Promise<SpinResponse> {
    const spinRequest: SpinRequest = { userId };
    return apiClient.post<SpinResponse>("/spin", spinRequest);
  }
}

export default SpinService;
