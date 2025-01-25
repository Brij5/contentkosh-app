import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal, selectModal } from '../store/slices/uiSlice';

const useModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector(selectModal);

  const open = useCallback((type, props = {}) => {
    dispatch(openModal({ type, props }));
  }, [dispatch]);

  const close = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const confirm = useCallback(({
    title = 'Confirm Action',
    message = 'Are you sure you want to proceed?',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    variant = 'danger'
  } = {}) => {
    open('confirm', {
      title,
      message,
      confirmText,
      cancelText,
      onConfirm,
      onCancel,
      variant
    });
  }, [open]);

  const alert = useCallback(({
    title = 'Alert',
    message,
    buttonText = 'OK',
    onClose,
    variant = 'info'
  } = {}) => {
    open('alert', {
      title,
      message,
      buttonText,
      onClose,
      variant
    });
  }, [open]);

  const prompt = useCallback(({
    title = 'Enter Value',
    message,
    defaultValue = '',
    placeholder = '',
    confirmText = 'Submit',
    cancelText = 'Cancel',
    onSubmit,
    onCancel,
    validator
  } = {}) => {
    open('prompt', {
      title,
      message,
      defaultValue,
      placeholder,
      confirmText,
      cancelText,
      onSubmit,
      onCancel,
      validator
    });
  }, [open]);

  const custom = useCallback((type, props = {}) => {
    open(type, props);
  }, [open]);

  return {
    isOpen: modal.isOpen,
    type: modal.type,
    props: modal.props,
    open,
    close,
    confirm,
    alert,
    prompt,
    custom
  };
};

export default useModal; 