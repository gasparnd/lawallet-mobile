import {useState} from 'react';

export type UseLoading = {
  isLoading: boolean;
  withLoading: <T>(fn: () => Promise<T>) => Promise<T>;
};

export default function useLoading(): UseLoading {
  const [isLoading, setLoading] = useState<boolean>(false);

  const withLoading = async <T>(fn: () => Promise<T>): Promise<T> => {
    try {
      setLoading(true);

      const result = await fn();
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return {
    isLoading,
    withLoading,
  };
}
