import clsx from 'clsx';
import React from 'react';
import Typography from '../Typography';

interface PageSectionProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  noPadding?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const PageSection: React.FC<PageSectionProps> = ({
  title,
  description,
  action,
  noPadding = false,
  className,
  children,
}) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden',
        className,
      )}
    >
      {title && (
        <div className='px-4 pt-4 pb-3 border-b border-gray-100 flex items-start justify-between'>
          <div>
            <Typography variant='caption' weight='semiBold' color='primary'>
              {title}
            </Typography>
            {description && (
              <Typography
                variant='overline'
                color='muted'
                customClassname='mt-0.5'
              >
                {description}
              </Typography>
            )}
          </div>
          {action && <div className='ml-4 shrink-0'>{action}</div>}
        </div>
      )}
      <div className={clsx(!noPadding && 'p-4')}>{children}</div>
    </div>
  );
};

export default PageSection;
