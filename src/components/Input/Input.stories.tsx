import type { Meta, StoryObj } from '@storybook/react-vite';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { label: 'Username', name: 'username', placeholder: 'Enter username' },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'you@example.com',
    helperText: 'We will never share your email.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    name: 'password',
    type: 'password',
    defaultValue: 'short',
    error: true,
    helperText: 'Password must be at least 8 characters.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Read-only',
    name: 'readonly',
    value: 'Cannot edit',
    disabled: true,
    onChange: () => {},
  },
};
