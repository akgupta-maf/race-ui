import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { SelectOption } from './AutocompleteDropdown';
import AutocompleteDropdown from './AutocompleteDropdown';

const options: SelectOption[] = [
  { key: 'All', value: 'all' },
  { key: 'React', value: 'react' },
  { key: 'Vue', value: 'vue' },
  { key: 'Angular', value: 'angular' },
  { key: 'Svelte', value: 'svelte' },
  { key: 'Solid', value: 'solid' },
];

const meta: Meta<typeof AutocompleteDropdown> = {
  title: 'Components/AutocompleteDropdown',
  component: AutocompleteDropdown,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='w-64 p-4'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AutocompleteDropdown>;

function SingleDemo() {
  const [selected, setSelected] = useState<SelectOption[]>([]);
  return (
    <AutocompleteDropdown
      options={options}
      selected={selected}
      onSelect={setSelected}
      placeholder='Select a framework'
      label='Framework'
    />
  );
}

function MultiDemo() {
  const [selected, setSelected] = useState<SelectOption[]>([]);
  return (
    <AutocompleteDropdown
      options={options}
      selected={selected}
      onSelect={setSelected}
      isMultiSelect
      placeholder='Select frameworks'
      label='Frameworks'
    />
  );
}

export const SingleSelect: Story = {
  render: () => <SingleDemo />,
};

export const MultiSelect: Story = {
  render: () => <MultiDemo />,
};

export const Loading: Story = {
  render: () => (
    <AutocompleteDropdown
      options={options}
      selected={[]}
      onSelect={() => {}}
      loading
      placeholder='Loading...'
    />
  ),
};

export const NoSearch: Story = {
  render: () => {
    const [selected, setSelected] = useState<SelectOption[]>([]);
    return (
      <AutocompleteDropdown
        options={options}
        selected={selected}
        onSelect={setSelected}
        showSearch={false}
        placeholder='Select a framework'
      />
    );
  },
};
