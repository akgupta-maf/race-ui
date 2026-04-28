import clsx from 'clsx';
import React, { useState } from 'react';
import Typography from '../Typography/Typography';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
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
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    options[0]?.value,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
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
            className='form-radio h-4 w-4 text-blue-600 border-gray-300' // Removed focus:ring-3 classes
          />
          <Typography variant='caption' customClassname='text-gray-700'>
            {option.label}
          </Typography>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
