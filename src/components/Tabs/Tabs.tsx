import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
import React, { useState } from 'react';
import { logActivity } from '../../utils/activityLog.util';
import { CustomButton } from '../Button';
import Typography from '../Typography';

export interface ITabGroup {
  children: React.ReactNode;
  name: string;
  unmount?: boolean;
}
export interface ITabButtonGroup {
  title: string;
  onClick: () => void;
  loading: boolean;
}
interface TabsProps {
  tabs: ITabGroup[];
  selectedTab?: number;
  onTabChange?: (index: number) => void;
  buttonGroup?: ITabButtonGroup[];
  messages?: string[];
  country?: { name: string };
  variant?: 'underline' | 'pill';
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  selectedTab: controlledSelectedTab,
  onTabChange,
  buttonGroup,
  messages,
  country,
  variant = 'underline',
}) => {
  const [internalSelectedTab, setInternalSelectedTab] = useState(0);
  const isControlled = controlledSelectedTab !== undefined;
  const selectedTab = isControlled
    ? controlledSelectedTab
    : internalSelectedTab;

  const handleTabChange = (index: number) => {
    if (!country) return;
    logActivity({
      event_type: 'tab_click',
      country: country?.name,
      event_name: `${tabs[index].name
        .split(' ')
        .join('_')
        .toLowerCase()}_tab_click`,
      component: 'Tab Component',
      event_metadata: {
        tabName: tabs[index].name,
      },
    });
    if (!isControlled) {
      setInternalSelectedTab(index);
    }
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <TabGroup
      selectedIndex={selectedTab}
      onChange={handleTabChange}
      className='flex flex-col flex-1 w-full'
    >
      <div className={clsx('flex items-center justify-between', variant === 'underline' && 'border-b border-gray-200')}>
        <TabList className='flex gap-1'>
          {tabs.map(({ name }) => (
            <Tab
              key={name}
              className={clsx(
                'font-semibold focus:outline-hidden transition-colors duration-150',
                variant === 'underline'
                  ? 'py-2 px-3 -mb-px border-b-2 border-transparent text-primary-60 data-selected:border-primary-cta data-selected:text-primary data-hover:text-primary rounded-none'
                  : 'rounded-sm py-1 px-3 data-selected:bg-primary-40 data-hover:bg-primary-20 data-selected:data-hover:bg-primary-40 data-focus:outline-1 data-focus:outline-white',
              )}
            >
              <Typography variant='caption' weight='semiBold'>
                {name}
              </Typography>
            </Tab>
          ))}
        </TabList>
        {messages && messages.length > 0 && (
          <div className='messages'>
            {messages.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        )}
        {buttonGroup?.length && (
          <div className='flex gap-4'>
            {buttonGroup.map(({ title, onClick, loading }) => (
              <CustomButton
                key={title}
                onClick={onClick}
                loading={loading}
                disabled={title === 'Run Optimization'}
              >
                {title}
              </CustomButton>
            ))}
          </div>
        )}
      </div>
      <TabPanels className='mt-0 flex-1 flex flex-col'>
        {tabs.map(({ name, children, unmount = true }) => (
          <TabPanel
            unmount={unmount}
            key={name}
            className='flex flex-col flex-1'
          >
            {children}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default Tabs;
