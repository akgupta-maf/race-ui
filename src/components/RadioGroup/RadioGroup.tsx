import clsx from 'clsx';
import React from 'react';
import Typography from '../Typography';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  selectedOption: string;
  options: RadioOption[];
  name: string;
  onChange: (value: string) => void;
  align?: 'horizontal' | 'vertical';
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  name,
  onChange,
  align,
  selectedOption,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div
      className={clsx(
        'flex',
        align === 'horizontal' ? 'flex-row space-x-4' : 'flex-col space-y-2',
      )}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className='flex items-center space-x-1 cursor-pointer'
        >
          <input
            type='radio'
            name={name}
            value={option.value}
            checked={selectedOption === option.value}
            onChange={handleChange}
            className='h-4 w-4 text-primary-cta border-gray-300 focus:ring-primary-cta  cursor-pointer accent-primary'
          />
          <Typography variant='caption'>{option.label}</Typography>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
