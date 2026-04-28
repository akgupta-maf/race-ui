import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

type InputSize = 'sm' | 'md' | 'lg' | 'xl';

const sizeClasses: Record<InputSize, string> = {
  sm: 'p-1 px-2 w-24 text-xs',
  md: 'p-1.5 px-2 w-32 text-sm',
  lg: 'p-2 px-2 w-44 text-sm',
  xl: 'p-2.5 px-2 w-full text-sm',
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  error?: boolean;
  helperText?: string;
  inputClassName?: string;
  rootClassName?: string;
  inputSize?: InputSize;
}

const Input = (props: InputProps) => {
  const {
    label,
    name,
    error,
    helperText,
    rootClassName,
    inputClassName,
    inputSize,
    value,
    defaultValue,
    onFocus,
    onBlur,
    ...inputProps
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!(value || defaultValue));

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  useEffect(() => {
    if (error) inputRef.current?.focus();
  }, [error]);

  const isFloating = focused || hasValue;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    setHasValue(!!e.target.value);
    onBlur?.(e);
  };

  return (
    <div className={clsx('relative w-full', rootClassName)}>
      <input
        ref={inputRef}
        id={name}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder=''
        className={clsx(
          'bg-transparent border rounded-lg text-gray-900 block outline-none transition-colors',
          inputSize ? sizeClasses[inputSize] : 'w-full text-sm',
          error
            ? 'border-red-500 focus:border-red-600'
            : 'border-gray-300 focus:border-primary-500',
          inputClassName,
        )}
        {...inputProps}
      />

      {label && (
        <label
          htmlFor={name}
          className={clsx(
            'absolute left-2 transition-all duration-200 pointer-events-none px-1 bg-white',
            isFloating
              ? 'top-0 -translate-y-1/2 text-xs'
              : 'top-1/2 -translate-y-1/2 text-sm',
            error
              ? 'text-red-500'
              : focused
                ? 'text-primary-600'
                : 'text-gray-400',
          )}
        >
          {label}
        </label>
      )}

      {helperText && (
        <span
          className={clsx(
            'mt-1 text-xs block',
            error ? 'text-red-500' : 'text-gray-500',
          )}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Input;
