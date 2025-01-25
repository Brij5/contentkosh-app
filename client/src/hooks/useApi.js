import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../store/slices/uiSlice';
import useToast from './useToast';

const useApi = (apiFunction, options = {}) => {
  const {
    showSuccessToast = false,
    showErrorToast = true,
    successMessage,
    transformResponse,
    onSuccess,
    onError,
    useGlobalLoading = false
  } = options;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const toast = useToast();

  const execute = useCallback(async (...params) => {
    try {
      setError(null);
      setIsLoading(true);
      if (useGlobalLoading) {
        dispatch(setLoading(true));
      }

      const response = await apiFunction(...params);
      const transformedData = transformResponse ? transformResponse(response.data) : response.data;
      
      setData(transformedData);
      
      if (showSuccessToast) {
        toast.success(successMessage || 'Operation completed successfully');
      }
      
      if (onSuccess) {
        onSuccess(transformedData);
      }
      
      return transformedData;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      
      if (showErrorToast) {
        toast.error(errorMessage);
      }
      
      if (onError) {
        onError(err);
      }
      
      throw err;
    } finally {
      setIsLoading(false);
      if (useGlobalLoading) {
        dispatch(setLoading(false));
      }
    }
  }, [apiFunction, dispatch, onError, onSuccess, showErrorToast, showSuccessToast, successMessage, toast, transformResponse, useGlobalLoading]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    data,
    error,
    isLoading,
    execute,
    reset
  };
};

export default useApi;
