import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CustomButton } from '../Button/Button';
import CustomModal from './CustomModal';

const meta: Meta<typeof CustomModal> = {
  title: 'Components/CustomModal',
  component: CustomModal,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof CustomModal>;

function ModalDemo(
  props: Omit<React.ComponentProps<typeof CustomModal>, 'open' | 'onClose'>,
) {
  const [open, setOpen] = useState(false);
  return (
    <div className='p-8'>
      <CustomButton onClick={() => setOpen(true)}>Open Modal</CustomButton>
      <CustomModal {...props} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export const Default: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    title: 'Confirm Action',
    children: (
      <p className='text-sm text-gray-600'>Are you sure you want to proceed?</p>
    ),
    actions: (
      <>
        <CustomButton variant='outline'>Cancel</CustomButton>
        <CustomButton variant='solid'>Confirm</CustomButton>
      </>
    ),
    showCloseIcon: true,
  },
};

export const WithoutTitle: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    children: <p className='text-sm text-gray-600'>A modal without a title.</p>,
    showCloseIcon: true,
  },
};

export const DisableBackdropClick: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    ...Default.args,
    title: 'Cannot dismiss by clicking outside',
    disableBackdropClick: true,
  },
};

export const LargeModal: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    ...Default.args,
    title: 'Large Modal',
    maxWidth: '2xl',
  },
};
