import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: boolean;
  helperText?: string;
  inputClassName?: string;
  rootClassName?: string;
}
const Input = (props: InputProps) => {
  const {
    label,
    name,
    error,
    helperText,
    rootClassName,
    inputClassName,
    ...inputProps
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (error) {
      inputRef.current?.focus();
    }
  }, [error]);

  return (
    <div className={rootClassName}>
      <label
        htmlFor={name}
        className={clsx(
          'block mb-0.5 text-sm font-medium text-gray-900',
          error ? 'text-red-500' : '',
        )}
      >
        {label}
      </label>
      <input
        ref={inputRef}
        id='name'
        className={clsx(
          'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
          error ? 'focus:border-red-500 focus:ring-red-500' : '',
          inputClassName,
        )}
        {...inputProps}
      />
      <span className={clsx('my-2 text-sm', error ? 'text-red-500' : '')}>
        {helperText}
      </span>
    </div>
  );
};

export default Input;
