import clsx from 'clsx';
import { Mail } from 'lucide-react';
import React, { useEffect, useMemo, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Typography from '../Typography/Typography';
import SidebarLinkGroup from './SidebarLinkGroup';

export interface ISidebarTab {
  name: string;
  route: string;
  permission?: string | number;
  country?: string[];
  roleAccess?: string[];
}

export interface ISidebarData {
  title: string;
  route: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  tabs?: ISidebarTab[];
  country?: string[];
  roleAccess?: string[];
}

export interface SidebarProps {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  menuItems: ISidebarData[];
  /** Resolved logo URL shown when the sidebar is expanded. */
  logoUrl: string;
  /** Resolved small logo URL shown when the sidebar is collapsed. */
  smallLogoUrl: string;
  /** Contact email for the "Contact Us" footer. Defaults to race@mafcarrefour.com. */
  contactEmail?: string;
  /** Current user's role name. Omit (with the other filter inputs) to disable filtering. */
  userRole?: string;
  /** The current user's permission names. */
  userPermissions?: string[];
  /** Current country name, used to filter country-scoped items. */
  country?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  expanded,
  setExpanded,
  menuItems,
  logoUrl,
  smallLogoUrl,
  contactEmail = 'race@mafcarrefour.com',
  userRole,
  userPermissions,
  country,
}) => {
  const location = useLocation();
  const { pathname } = location;
  const sidebar = useRef<HTMLDivElement>(null);

  const menuItemsFiltered = useMemo(
    () =>
      menuItems
        .map((d) => {
          if (d.roleAccess?.length && !d.roleAccess.includes(userRole ?? '')) {
            return;
          }
          if (d.country?.length && !d.country.includes(country as string)) {
            return;
          }

          return {
            ...d,
            tabs: d.tabs?.filter((tab) => {
              if (
                tab.roleAccess?.length &&
                !tab.roleAccess.includes(userRole ?? '')
              ) {
                return false;
              }
              if (
                tab.country?.length &&
                !tab.country.includes(country as string)
              ) {
                return false;
              }
              if (
                tab.permission == null ||
                userPermissions?.includes(String(tab.permission))
              ) {
                return true;
              }
              return false;
            }),
          };
        })
        .filter((d) => !!d?.tabs?.length) as (ISidebarData & {
        tabs: ISidebarTab[];
      })[],
    [menuItems, userRole, userPermissions, country],
  );

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', `${expanded}`);
  }, [expanded]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setExpanded]);

  return (
    <div>
      <div
        id='sidebar'
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen ${
          expanded
            ? 'w-60 overflow-y-scroll lg:overflow-y-auto no-scrollbar'
            : 'w-18'
        } shrink-0 bg-secondary-20 border-r border-secondary-40 p-4 transition-all duration-400 ease-in-out`}
      >
        {/* Sidebar header */}
        {expanded && (
          <div className='flex justify-between mb-8 pr-3 sm:px-2'>
            <div className='flex ml-4'>
              <img src={logoUrl} className='w-full h-10' />
            </div>
          </div>
        )}
        {/* Links */}
        <div className='space-y-8 flex flex-col overflow-y-auto no-scrollbar pb-2'>
          <div>
            {!expanded && (
              <div className='flex justify-center mb-4'>
                <img src={smallLogoUrl} className='w-8' />
              </div>
            )}
            <ul className='mt-3'>
              {menuItemsFiltered.map((data) => (
                <SidebarLinkGroup
                  key={data.title}
                  activecondition={
                    pathname.endsWith(data.route) ||
                    data.tabs.some((tab) => pathname.endsWith(tab.route))
                  }
                >
                  {(handleClick, open) => {
                    const { Icon } = data;
                    const isSelected =
                      pathname.endsWith(data.route) ||
                      data.tabs.some((tab) => pathname.endsWith(tab.route));
                    return (
                      <React.Fragment>
                        <a
                          href='#0'
                          className={clsx(
                            'block truncate transition duration-150 px-2 py-2',
                            isSelected
                              ? 'border-l-2 border-primary-cta bg-white shadow-sm rounded-r-md'
                              : 'hover:bg-white/60 rounded-md',
                          )}
                          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.preventDefault();
                            if (expanded) {
                              handleClick(e);
                            } else {
                              setExpanded(true);
                            }
                          }}
                        >
                          <div
                            className={clsx(
                              'flex items-center',
                              expanded ? 'justify-between' : 'justify-center',
                            )}
                          >
                            <div className='flex items-center'>
                              <Icon
                                className={clsx(
                                  'shrink-0 h-5 w-5',
                                  isSelected
                                    ? 'fill-transparent stroke-primary-cta'
                                    : 'stroke-primary fill-none',
                                )}
                              />
                              {expanded && (
                                <Typography
                                  variant='caption'
                                  weight='medium'
                                  letterSpacing='wide'
                                  customClassname={clsx(
                                    'ml-3 duration-200',
                                    isSelected
                                      ? 'text-primary-cta'
                                      : 'text-primary-80',
                                  )}
                                >
                                  {data.title}
                                </Typography>
                              )}
                            </div>
                            {expanded && (
                              <div className='flex shrink-0 ml-2'>
                                <svg
                                  className={clsx(
                                    'w-3 h-3 shrink-0 ml-1 fill-current transition-transform duration-200',
                                    open && 'rotate-180',
                                    isSelected
                                      ? 'text-primary-cta'
                                      : 'text-primary-60',
                                  )}
                                  viewBox='0 0 12 12'
                                >
                                  <path d='M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z' />
                                </svg>
                              </div>
                            )}
                          </div>
                        </a>
                        {expanded && (
                          <div>
                            <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                              {data.tabs.map((tab) => {
                                const isActiveTab = pathname.endsWith(tab.route);

                                return (
                                  <li
                                    key={tab.route}
                                    className={clsx(
                                      'my-1 last:mb-0 px-2.5 py-1 transition duration-150',
                                      isActiveTab
                                        ? 'bg-primary-cta/10 border-l-2 border-primary-cta rounded-r-md'
                                        : 'hover:bg-white/60 rounded-md',
                                    )}
                                  >
                                    <NavLink
                                      end
                                      to={tab.route}
                                      className='block truncate'
                                    >
                                      <Typography
                                        variant='caption'
                                        weight='regular'
                                        letterSpacing='wide'
                                        customClassname={clsx(
                                          'duration-200',
                                          isActiveTab
                                            ? 'text-primary-cta font-medium'
                                            : 'text-primary-80',
                                        )}
                                      >
                                        {tab.name}
                                      </Typography>
                                    </NavLink>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              ))}
            </ul>
          </div>
        </div>

        <div className='sidebar-container'>
          <div className='sidebar-content'>
            {expanded ? (
              <div className='mt-auto px-4 py-2 bg-white rounded-lg border border-secondary-40 flex justify-between items-center'>
                <div>
                  <Typography variant='caption'>Contact Us</Typography>
                </div>
                <div>
                  <a href={`mailto:${contactEmail}`}>
                    <Mail className='w-5 h-5 text-primary' />
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
