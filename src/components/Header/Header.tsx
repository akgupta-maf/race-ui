import { ArrowLeftRight, Menu } from 'lucide-react';
import React from 'react';
import CountryPopover, {
  Country,
} from '../CountryPopover/CountryPopover';
import Tooltip from '../Tooltip/Tooltip';
import Typography from '../Typography/Typography';

export interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  /** Title typography variant. Defaults to 'body-lg'. */
  titleVariant?: 'body-lg' | 'h4';
  /** Switch-tool link target. Omit to hide the switch-tool icon. */
  switchToolHref?: string;
  /** User menu slot — apps pass their own <UserPopover />. */
  userMenu: React.ReactNode;
  /** Optional filters slot rendered left of the country popover (e.g. store-type dropdown). */
  filters?: React.ReactNode;
  /** Whether to render the country popover. Defaults to true (still requires `country`). */
  showCountry?: boolean;
  country?: Country | null;
  countryList?: Country[];
  setCountry?: (country: Country) => void;
}

const Header: React.FC<HeaderProps> = ({
  sidebarOpen,
  setSidebarOpen,
  title,
  titleVariant = 'body-lg',
  switchToolHref,
  userMenu,
  filters,
  showCountry = true,
  country,
  countryList = [],
  setCountry,
}) => {
  return (
    <header className='sticky top-0 h-14 bg-white border-b border-gray-100 shadow-[0_1px_3px_0_rgb(0,0,0,0.06)] z-10'>
      <div className='h-full pr-6 pl-4 w-full flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <Menu
            className='text-primary-60 w-5 h-5 cursor-pointer hover:text-primary transition-colors duration-150'
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
          <Typography
            variant={titleVariant}
            weight='semiBold'
            customClassname='text-primary'
          >
            {title}
          </Typography>
          {switchToolHref && (
            <>
              <div className='h-5 w-px bg-gray-200' />
              <Tooltip text='Switch Tool' position='bottom'>
                <a href={switchToolHref}>
                  <ArrowLeftRight className='w-4 h-4 text-primary-60 cursor-pointer hover:text-primary transition-colors duration-150' />
                </a>
              </Tooltip>
            </>
          )}
        </div>
        <div className='flex items-center gap-3'>
          {filters}
          {showCountry && country && (
            <CountryPopover
              countryList={countryList}
              setCountry={(c) => {
                if (setCountry) setCountry(c);
              }}
              country={country}
            />
          )}
          {(filters || (showCountry && country)) && (
            <div className='h-5 w-px bg-gray-200' />
          )}
          {userMenu}
        </div>
      </div>
    </header>
  );
};

export default Header;
