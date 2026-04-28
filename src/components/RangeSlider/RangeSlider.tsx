import React from 'react';

type RangeSliderProps = {
  value?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
};

const RangeSlider: React.FC<RangeSliderProps> = ({
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 10,
}) => {
  return (
    <input
      className='cursor-pointer w-full accent-primary'
      type='range'
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
    />
  );
};

export default RangeSlider;
