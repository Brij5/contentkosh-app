import { useState, useCallback, useEffect } from 'react';

const useForm = (initialValues = {}, validationSchema = null, onSubmit = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const validateField = useCallback(async (name, value) => {
    if (!validationSchema) return '';

    try {
      await validationSchema.validateAt(name, { [name]: value });
      return '';
    } catch (error) {
      return error.message;
    }
  }, [validationSchema]);

  const validateForm = useCallback(async (values) => {
    if (!validationSchema) return {};

    try {
      await validationSchema.validate(values, { abortEarly: false });
      return {};
    } catch (error) {
      const errors = {};
      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
      return errors;
    }
  }, [validationSchema]);

  const handleChange = useCallback(async (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setValues((prev) => ({
      ...prev,
      [name]: fieldValue
    }));

    if (touched[name]) {
      const fieldError = await validateField(name, fieldValue);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError
      }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback(async (event) => {
    const { name, value } = event.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));

    const fieldError = await validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError
    }));
  }, [validateField]);

  const setFieldValue = useCallback(async (name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value
    }));

    if (touched[name]) {
      const fieldError = await validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError
      }));
    }
  }, [touched, validateField]);

  const setFieldTouched = useCallback(async (name, isTouched = true) => {
    setTouched((prev) => ({
      ...prev,
      [name]: isTouched
    }));

    if (isTouched) {
      const fieldError = await validateField(name, values[name]);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError
      }));
    }
  }, [validateField, values]);

  const handleSubmit = useCallback(async (event) => {
    if (event) {
      event.preventDefault();
    }

    setSubmitCount((prev) => prev + 1);
    setIsSubmitting(true);

    const formErrors = await validateForm(values);
    setErrors(formErrors);

    const hasErrors = Object.keys(formErrors).length > 0;
    if (!hasErrors && onSubmit) {
      await onSubmit(values);
    }

    setIsSubmitting(false);
    return !hasErrors;
  }, [validateForm, values, onSubmit]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setSubmitCount(0);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    submitCount,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    reset
  };
};

export default useForm;