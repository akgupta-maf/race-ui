import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import RangeSlider from './RangeSlider';

const meta: Meta<typeof RangeSlider> = {
  title: 'Components/RangeSlider',
  component: RangeSlider,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RangeSlider>;

function SliderDemo(
  props: Omit<React.ComponentProps<typeof RangeSlider>, 'onChange' | 'value'>,
) {
  const [val, setVal] = useState(props.min ?? 0);
  return (
    <div className='w-64 space-y-2'>
      <RangeSlider
        {...props}
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
      />
      <p className='text-sm text-gray-600'>Value: {val}</p>
    </div>
  );
}

export const Default: Story = {
  render: () => <SliderDemo />,
};

export const CustomRange: Story = {
  render: () => <SliderDemo min={10} max={50} step={5} />,
};
