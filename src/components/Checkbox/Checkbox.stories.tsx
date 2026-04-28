import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

function CheckboxDemo({ checked }: { checked: boolean }) {
  const [val, setVal] = useState(checked);
  return <Checkbox checked={val} onChange={setVal} />;
}

export const Unchecked: Story = {
  render: () => <CheckboxDemo checked={false} />,
};

export const Checked: Story = {
  render: () => <CheckboxDemo checked={true} />,
};

export const Group: Story = {
  render: () => (
    <div className='flex flex-col gap-2'>
      {['Option A', 'Option B', 'Option C'].map((label) => {
        const [val, setVal] = useState(false);
        return (
          <label
            key={label}
            className='flex items-center gap-2 cursor-pointer text-sm'
          >
            <Checkbox checked={val} onChange={setVal} />
            {label}
          </label>
        );
      })}
    </div>
  ),
};
