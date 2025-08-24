import { apiClient } from "./api";
import type { UserRegistration, RegistrationResponse, User } from "../types";

export class UserService {
  /**
   * Register a new user or get existing user status
   */
  static async register(
    userData: UserRegistration
  ): Promise<RegistrationResponse> {
    return apiClient.post<RegistrationResponse>("/users/register", userData);
  }

  /**
   * Get user status by ID (requires admin auth - not used in public frontend)
   * This is here for completeness but won't be used in the public interface
   */
  static async getUserStatus(userId: string): Promise<User> {
    return apiClient.get<User>(`/users/${userId}`);
  }
}

export default UserService;
