import clsx from 'clsx';
import { TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  trend?: number;
  trendLabel?: string;
  icon?: React.ComponentType<{ className?: string; size?: number }>;
  loading?: boolean;
  variant?: 'default' | 'compact';
  className?: string;
}

const LoadingDots = () => (
  <div className='flex gap-1 items-center h-5'>
    <span className='w-1.5 h-1.5 rounded-full bg-primary-40 animate-bounce [animation-delay:-0.3s]' />
    <span className='w-1.5 h-1.5 rounded-full bg-primary-40 animate-bounce [animation-delay:-0.15s]' />
    <span className='w-1.5 h-1.5 rounded-full bg-primary-40 animate-bounce' />
  </div>
);

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subValue,
  trend,
  trendLabel,
  icon: Icon,
  loading = false,
  variant = 'default',
  className,
}) => {
  const hasTrend = trend !== undefined && trend !== 0;

  if (variant === 'compact') {
    return (
      <div
        className={clsx(
          'bg-secondary-20 rounded-xl px-4 py-2.5 flex items-center justify-between border border-secondary-40 shadow-sm',
          className,
        )}
      >
        <div className='flex items-center gap-2'>
          {Icon && (
            <div className='w-6 h-6 rounded-lg bg-secondary-40 flex items-center justify-center shrink-0'>
              <Icon className='w-3 h-3 text-primary' size={12} />
            </div>
          )}
          <span className='text-overline font-medium text-primary-60 uppercase tracking-wide'>
            {title}
          </span>
        </div>
        {loading ? (
          <LoadingDots />
        ) : (
          <span className='text-caption font-semibold text-primary'>
            {value}
            {subValue && (
              <span className='ml-1 text-overline font-medium text-primary-60'>
                {subValue}
              </span>
            )}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'bg-secondary-20 rounded-xl px-4 py-3 flex flex-col gap-1.5 border border-secondary-40 shadow-sm',
        className,
      )}
    >
      <div className='flex items-center gap-2'>
        {Icon && (
          <div className='w-7 h-7 rounded-lg bg-secondary-40 flex items-center justify-center shrink-0'>
            <Icon className='w-3.5 h-3.5 text-primary' size={14} />
          </div>
        )}
        <span className='text-overline font-medium text-primary-60 uppercase tracking-wide'>
          {title}
        </span>
      </div>
      {loading ? (
        <LoadingDots />
      ) : (
        <div className='flex items-baseline gap-1'>
          <span className='text-caption font-semibold text-primary leading-tight'>
            {value}
          </span>
          {subValue && (
            <span className='text-overline font-medium text-primary-60'>
              {subValue}
            </span>
          )}
        </div>
      )}
      {hasTrend && !loading && (
        <div className='flex items-center gap-1'>
          {trend! > 0 ? (
            <TrendingUp className='w-3 h-3 text-success' />
          ) : (
            <TrendingDown className='w-3 h-3 text-red-500' />
          )}
          <span
            className={clsx(
              'text-overline font-medium',
              trend! > 0 ? 'text-success' : 'text-red-500',
            )}
          >
            {trend! > 0 ? '+' : ''}
            {trend}%{trendLabel ? ` ${trendLabel}` : ''}
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
