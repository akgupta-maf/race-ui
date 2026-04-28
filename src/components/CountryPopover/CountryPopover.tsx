import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';
import React from 'react';
import { getCountryFlag } from '../../utils/countryFlags';
import Tooltip from '../Tooltip/Tooltip';
import Typography from '../Typography/Typography';

export interface Country {
  id: number;
  name: string;
}

export interface CountryPopoverProps {
  country?: Country | null;
  countryList: Country[];
  setCountry?: (country: Country) => void;
}

const CountryPopover: React.FC<CountryPopoverProps> = ({
  country,
  countryList,
  setCountry,
}) => {
  if (!country) return null;

  return (
    <Popover>
      <Tooltip text={country.name} position='bottom' size='small'>
        <PopoverButton className='block focus:outline-hidden data-focus:outline-1 data-focus:outline-white'>
          <div className='flex items-center cursor-pointer'>
            <img
              src={getCountryFlag(country.name.toUpperCase())}
              alt='logo'
              className='max-w-10 h-6 w-auto'
            />
            <ChevronDown className='w-4 h-4 ml-2' />
          </div>
        </PopoverButton>
      </Tooltip>
      <PopoverPanel
        transition
        anchor='bottom'
        className='bg-gray-100 rounded-md py-1 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-closed:-translate-y-1 data-closed:opacity-0 border border-gray-300 shadow-xs z-50 w-32 overflow-hidden'
      >
        <div className='bg-gray-100 w-full'>
          {countryList.map((c) => {
            const isSelected = c.id === country.id;
            return (
              <CloseButton
                key={c.id}
                className={`flex items-center gap-2 px-3 cursor-pointer w-full text-left py-1.5 ${
                  isSelected ? 'bg-white font-semibold' : 'hover:bg-white'
                }`}
                onClick={() => {
                  if (setCountry) {
                    setCountry(c);
                  }
                }}
              >
                <img
                  src={getCountryFlag(c.name.toUpperCase())}
                  alt={c.name}
                  className='h-4 w-6'
                />
                <Typography variant='caption' customClassname='flex-1'>
                  {c.name}
                </Typography>
                {isSelected && (
                  <Check className='w-4 h-4 text-primary shrink-0' />
                )}
              </CloseButton>
            );
          })}
        </div>
      </PopoverPanel>
    </Popover>
  );
};

export default CountryPopover;
