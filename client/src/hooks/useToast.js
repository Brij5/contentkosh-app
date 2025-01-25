import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addToast, removeToast } from '../store/slices/uiSlice';

const useToast = () => {
  const dispatch = useDispatch();

  const show = useCallback((message, options = {}) => {
    const {
      type = 'info',
      title,
      duration = 5000,
      position = 'top-right',
      showIcon = true,
      showCloseButton = true,
      onClose
    } = options;

    const id = Date.now();

    dispatch(
      addToast({
        id,
        type,
        title,
        message,
        duration,
        position,
        showIcon,
        showCloseButton,
        onClose
      })
    );

    if (duration > 0) {
      setTimeout(() => {
        dispatch(removeToast(id));
        if (onClose) {
          onClose();
        }
      }, duration);
    }

    return id;
  }, [dispatch]);

  const success = useCallback((message, options = {}) => {
    return show(message, { ...options, type: 'success' });
  }, [show]);

  const error = useCallback((message, options = {}) => {
    return show(message, { ...options, type: 'error' });
  }, [show]);

  const warning = useCallback((message, options = {}) => {
    return show(message, { ...options, type: 'warning' });
  }, [show]);

  const info = useCallback((message, options = {}) => {
    return show(message, { ...options, type: 'info' });
  }, [show]);

  const remove = useCallback((id) => {
    dispatch(removeToast(id));
  }, [dispatch]);

  return {
    show,
    success,
    error,
    warning,
    info,
    remove
  };
};

export default useToast; 