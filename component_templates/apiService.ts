import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * API response interface
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

/**
 * API error interface
 */
export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

/**
 * Configuration for the API client
 */
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

/**
 * Create an axios instance with default configuration
 */
const apiClient = axios.create(API_CONFIG);

/**
 * Add request interceptor for authentication
 */
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('auth_token');
    
    // If token exists, add to headers
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Add response interceptor for error handling
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: error.message || 'Unknown error occurred',
      status: error.response?.status,
      data: error.response?.data,
    };

    // Handle specific status codes
    if (error.response?.status === 401) {
      // Handle unauthorized (e.g., redirect to login)
      console.warn('Unauthorized access, redirecting to login');
      // Example: window.location.href = '/login';
    }

    return Promise.reject(apiError);
  }
);

/**
 * API service with typed methods for making HTTP requests
 */
export const apiService = {
  /**
   * Make a GET request
   * 
   * @param url - The URL to request
   * @param config - Optional axios config
   * @returns Promise with the response data
   * 
   * @example
   * ```ts
   * const users = await apiService.get<User[]>('/users');
   * ```
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.get(url, config);
    return response.data;
  },

  /**
   * Make a POST request
   * 
   * @param url - The URL to request
   * @param data - The data to send
   * @param config - Optional axios config
   * @returns Promise with the response data
   * 
   * @example
   * ```ts
   * const newUser = await apiService.post<User>('/users', { name: 'John' });
   * ```
   */
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.post(url, data, config);
    return response.data;
  },

  /**
   * Make a PUT request
   * 
   * @param url - The URL to request
   * @param data - The data to send
   * @param config - Optional axios config
   * @returns Promise with the response data
   * 
   * @example
   * ```ts
   * const updatedUser = await apiService.put<User>('/users/1', { name: 'John Updated' });
   * ```
   */
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.put(url, data, config);
    return response.data;
  },

  /**
   * Make a PATCH request
   * 
   * @param url - The URL to request
   * @param data - The data to send
   * @param config - Optional axios config
   * @returns Promise with the response data
   * 
   * @example
   * ```ts
   * const patchedUser = await apiService.patch<User>('/users/1', { name: 'John Patched' });
   * ```
   */
  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.patch(url, data, config);
    return response.data;
  },

  /**
   * Make a DELETE request
   * 
   * @param url - The URL to request
   * @param config - Optional axios config
   * @returns Promise with the response data
   * 
   * @example
   * ```ts
   * await apiService.delete('/users/1');
   * ```
   */
  async delete<T = void>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.delete(url, config);
    return response.data;
  },
};

export default apiService; 