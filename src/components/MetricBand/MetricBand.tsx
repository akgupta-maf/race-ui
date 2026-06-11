import clsx from 'clsx';
import React from 'react';
import Typography from '../Typography';

interface MetricItem {
  key: string;
  title: string;
  value: string | number;
  loading?: boolean;
}

interface MetricGroup {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  label: string;
  items: MetricItem[];
}

interface MetricBandProps {
  groups: MetricGroup[];
  loading?: boolean;
  className?: string;
}

const LoadingDots = () => (
  <div className='flex gap-0.5 items-center h-4'>
    <span className='w-1 h-1 rounded-full bg-primary-40 animate-bounce [animation-delay:-0.3s]' />
    <span className='w-1 h-1 rounded-full bg-primary-40 animate-bounce [animation-delay:-0.15s]' />
    <span className='w-1 h-1 rounded-full bg-primary-40 animate-bounce' />
  </div>
);

export const MetricBand: React.FC<MetricBandProps> = ({
  groups,
  loading = false,
  className,
}) => {
  return (
    <div
      className={clsx(
        'bg-secondary-20 rounded-xl border border-secondary-40 shadow-sm px-5 py-3 flex items-stretch divide-x divide-primary-20',
        className,
      )}
    >
      {groups.map(({ icon: Icon, label, items }, groupIndex) => (
        <div
          key={groupIndex}
          className={clsx(
            'flex items-center gap-3',
            groupIndex > 0 && 'pl-5',
            groupIndex < groups.length - 1 && 'pr-5',
          )}
        >
          <div className='w-8 h-8 rounded-lg bg-white/60 flex items-center justify-center shrink-0'>
            <Icon className='w-4 h-4 text-primary' size={16} />
          </div>
          <div className='flex flex-col gap-1'>
            <Typography
              variant='overline'
              color='grey'
              customClassname='uppercase tracking-wide'
            >
              {label}
            </Typography>
            <div className='flex items-center gap-4'>
              {items.map(({ key, title, value, loading: itemLoading }) => (
                <div key={key} className='flex flex-col gap-0.5'>
                  <Typography variant='caption-xs' color='muted'>
                    {title}
                  </Typography>
                  {loading || itemLoading ? (
                    <LoadingDots />
                  ) : (
                    <Typography
                      variant='caption'
                      weight='semiBold'
                      color='primary'
                    >
                      {String(value)}
                    </Typography>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricBand;
