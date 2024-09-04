import { useEffect, useState } from 'react';
import { useLoadingContext } from '../context/loading.context';

type ApiFunction<T> = () => Promise<T>;

function useApi<T>(apiFunction: ApiFunction<T>): () => Promise<T> {
  const { setLoading } = useLoadingContext();

  return async () => {
    setLoading(true);
    try {
      const result = await apiFunction();
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
}

export default useApi;
