import { useState } from 'react';

const useForm = (validator) => {
  const [value, setValue] = useState('');
  const [valueIsTouched, setValueIsTouched] = useState(false);

  const valueIsValid = validator(value);
  const hasError = !valueIsValid && valueIsTouched;

  const inputHandler = (e) => {
    setValue(e.target.value);
  };

  const BlurHandler = (e) => {
    setValueIsTouched(true);
  };

  const reset = () => {
    setValue('');
    setValueIsTouched(false);
  };

  return { inputHandler, hasError, BlurHandler, reset, value, valueIsValid };
};

export default useForm;
