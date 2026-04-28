import type { Meta, StoryObj } from '@storybook/react-vite';
import { CustomButton } from './Button';

const meta: Meta<typeof CustomButton> = {
  title: 'Components/CustomButton',
  component: CustomButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['solid', 'outline', 'ghost'] },
  },
};

export default meta;
type Story = StoryObj<typeof CustomButton>;

export const Solid: Story = {
  args: { children: 'Submit', variant: 'solid' },
};

export const Outline: Story = {
  args: { children: 'Cancel', variant: 'outline' },
};

export const Ghost: Story = {
  args: { children: 'Learn more', variant: 'ghost' },
};

export const Loading: Story = {
  args: { children: 'Submit', loading: true },
};

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-wrap gap-3'>
      <CustomButton variant='solid'>Solid</CustomButton>
      <CustomButton variant='outline'>Outline</CustomButton>
      <CustomButton variant='ghost'>Ghost</CustomButton>
      <CustomButton disabled>Disabled</CustomButton>
      <CustomButton loading>Loading</CustomButton>
    </div>
  ),
};
