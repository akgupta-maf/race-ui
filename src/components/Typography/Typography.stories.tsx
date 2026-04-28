import type { Meta, StoryObj } from '@storybook/react-vite';
import Typography from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'body',
        'body-lg',
        'caption',
        'overline',
        'caption-xs',
      ],
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'semiBold', 'bold'],
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'dark',
        'light',
        'grey',
        'success',
        'error',
        'warning',
        'info',
      ],
    },
    letterSpacing: {
      control: 'select',
      options: ['tight', 'normal', 'wide'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    variant: 'body',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className='space-y-2'>
      {(
        [
          'h1',
          'h2',
          'h3',
          'h4',
          'body-lg',
          'body',
          'caption',
          'overline',
          'caption-xs',
        ] as const
      ).map((v) => (
        <Typography key={v} variant={v}>
          [{v}] The quick brown fox
        </Typography>
      ))}
    </div>
  ),
};

export const AllWeights: Story = {
  render: () => (
    <div className='space-y-2'>
      {(['regular', 'medium', 'semiBold', 'bold'] as const).map((w) => (
        <Typography key={w} weight={w}>
          [{w}] The quick brown fox
        </Typography>
      ))}
    </div>
  ),
};
