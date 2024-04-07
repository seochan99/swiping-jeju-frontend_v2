import { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

import { instance } from '@/lib/instance';

/**
 * Custom hook for making HTTP requests using Axios.
 *
 * @template T - The type of the response data.
 * @param {string} url - The URL to send the request to.
 * @param {AxiosRequestConfig} [config] - The Axios request configuration.
 * @returns {{ data: T | null, isLoading: boolean, error: AxiosError | null }} - The response data, loading state, and error.
 */
export const useFetch = <T>(url: string, config?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await instance.get<T>(url, config);
      setData(response.data);
    } catch (error) {
      setError(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading === true) return;
    fetchData();
  }, [url, JSON.stringify(config)]);

  return {
    data,
    isLoading,
    error,
  };
};
