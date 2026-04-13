import type { Meta, StoryObj } from '@storybook/react-vite';
import RadioGroup from './RadioGroup';

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    align: { control: 'select', options: ['horizontal', 'vertical'] },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Vertical: Story = {
  args: {
    options,
    name: 'demo-vertical',
    align: 'vertical',
    onChange: () => {},
  },
};

export const Horizontal: Story = {
  args: {
    options,
    name: 'demo-horizontal',
    align: 'horizontal',
    onChange: () => {},
  },
};
