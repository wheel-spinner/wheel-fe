import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
} from "axios";
import type { ApiError } from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

class ApiClient {
  private client: AxiosInstance;

  constructor(baseUrl: string) {
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000, // 10 seconds
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add request ID for tracking
        config.headers["X-Request-ID"] = `${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<ApiError>) => {
        if (error.response) {
          // Server responded with error status
          const apiError = error.response.data;
          
          // For 409 status, preserve the original error structure
          if (error.response.status === 409 && apiError?.error === "ALREADY_SPUN") {
            const customError = new Error(apiError.message || "User has already spun the wheel");
            (customError as any).status = 409;
            (customError as any).errorCode = "ALREADY_SPUN";
            (customError as any).hasSpun = apiError.hasSpun;
            throw customError;
          }
          
          throw new Error(
            apiError?.message || error.message || "An error occurred"
          );
        } else if (error.request) {
          // Network error
          throw new Error("Network error. Please check your connection.");
        } else {
          // Other error
          throw new Error(error.message || "An unexpected error occurred");
        }
      }
    );
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await this.client.get<T>(endpoint);
    return response.data;
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(endpoint, data);
    return response.data;
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.client.put<T>(endpoint, data);
    return response.data;
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.client.delete<T>(endpoint);
    return response.data;
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
