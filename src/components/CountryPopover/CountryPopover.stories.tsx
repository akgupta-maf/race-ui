import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { Country } from './CountryPopover';
import CountryPopover from './CountryPopover';

const countryList: Country[] = [
  { id: 1, name: 'UAE' },
  { id: 2, name: 'Egypt' },
  { id: 3, name: 'Qatar' },
  { id: 4, name: 'KSA' },
  { id: 5, name: 'Kenya' },
  { id: 6, name: 'Jordan' },
  { id: 7, name: 'Georgia' },
  { id: 8, name: 'Bahrain' },
  { id: 9, name: 'Kuwait' },
  { id: 10, name: 'Oman' },
];

const meta: Meta<typeof CountryPopover> = {
  title: 'Components/CountryPopover',
  component: CountryPopover,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='p-8 flex justify-start'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CountryPopover>;

function Demo({ initialId = 1 }: { initialId?: number }) {
  const [country, setCountry] = useState<Country>(
    countryList.find((c) => c.id === initialId) ?? countryList[0],
  );
  return (
    <CountryPopover
      country={country}
      countryList={countryList}
      setCountry={setCountry}
    />
  );
}

export const Default: Story = {
  render: () => <Demo />,
};

export const PreselectedQatar: Story = {
  render: () => <Demo initialId={3} />,
};

export const NoCountry: Story = {
  render: () => <CountryPopover country={null} countryList={countryList} />,
};
