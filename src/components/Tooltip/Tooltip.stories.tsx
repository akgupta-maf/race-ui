import type { Meta, StoryObj } from '@storybook/react-vite';
import Tooltip from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
  decorators: [
    (Story) => (
      <div className='flex items-center justify-center h-40'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {
  args: {
    text: 'This is a tooltip',
    position: 'top',
    children: <span className='underline cursor-pointer'>Hover me</span>,
  },
};

export const Right: Story = {
  args: { ...Top.args, position: 'right' },
};

export const Bottom: Story = {
  args: { ...Top.args, position: 'bottom' },
};

export const Left: Story = {
  args: { ...Top.args, position: 'left' },
};

export const SmallSize: Story = {
  args: { ...Top.args, size: 'small', text: 'Small tooltip' },
};

export const LargeSize: Story = {
  args: { ...Top.args, size: 'large', text: 'Large tooltip with more content' },
};
