import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
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
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  selectedTab: controlledSelectedTab,
  onTabChange,
  buttonGroup,
  messages,
  country,
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
      <div className='flex items-center justify-between'>
        <TabList className='flex gap-4'>
          {tabs.map(({ name }) => (
            <Tab
              key={name}
              className='rounded-sm py-1 px-3 text-sm/6 font-semibold focus:outline-hidden data-selected:bg-primary-40 data-hover:bg-primary-20 data-selected:data-hover:bg-primary-40 data-focus:outline-1 data-focus:outline-white'
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
      <TabPanels className='mt-3 flex-1 flex flex-col'>
        {tabs.map(({ name, children, unmount = true }) => (
          <TabPanel
            unmount={unmount}
            key={name}
            className='rounded-xl bg-white/5 p-1 flex flex-col flex-1'
          >
            {children}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default Tabs;
