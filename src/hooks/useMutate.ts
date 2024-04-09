import { AxiosError, AxiosRequestConfig, Method } from 'axios';
import { useState } from 'react';

import { instance } from '@/lib/instance';

/**
 * A custom hook for making API requests and handling loading and error states.
 *
 * @template Payload - The type of the request payload.
 * @template Response - The type of the response data.
 * @param {string} url - The URL for the API request.
 * @param {Method} method - The HTTP method for the API request.
 * @param {AxiosRequestConfig} [config] - Additional configuration options for the request.
 * @returns {{
 *   trigger: (data: Payload) => Promise<Response | undefined>,
 *   isLoading: boolean,
 *   error: AxiosError | null
 * }} - An object containing the trigger function to make the request, isLoading state, and error state.
 */
export const useMutate = <Payload, Response>(
  url: string,
  method: Method,
  config?: AxiosRequestConfig,
) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const trigger = async (data: Payload): Promise<Response | undefined> => {
    setLoading(true);
    try {
      const response = await instance.request<Response>({
        url,
        method,
        data,
        ...config,
      });
      return response.data;
    } catch (error) {
      setError(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return {
    trigger,
    isLoading,
    error,
  };
};
