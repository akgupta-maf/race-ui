import type { Meta, StoryObj } from '@storybook/react-vite';
import { CustomButton } from '../Button/Button';
import ProgressBarProvider from './ProgressBarProvider';
import { useProgressBar } from './useProgressBar';

const meta: Meta = {
  title: 'Components/ProgressBar',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

function Demo() {
  const { showProgress, hideProgress } = useProgressBar();
  return (
    <div className='flex gap-3 p-4'>
      <CustomButton onClick={showProgress}>Show Progress</CustomButton>
      <CustomButton variant='outline' onClick={hideProgress}>
        Hide Progress
      </CustomButton>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <ProgressBarProvider>
      <Demo />
    </ProgressBarProvider>
  ),
};
