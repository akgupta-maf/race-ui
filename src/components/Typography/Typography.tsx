import clsx from 'clsx';
import React from 'react';

interface TypographyProps {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'body'
    | 'body-lg'
    | 'caption'
    | 'overline'
    | 'caption-xs';
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
  color?:
    | 'primary'
    | 'secondary'
    | 'dark'
    | 'light'
    | 'grey'
    | 'success'
    | 'error'
    | 'warning'
    | 'info';
  letterSpacing?: 'tight' | 'normal' | 'wide';
  component?: keyof React.JSX.IntrinsicElements; // Custom HTML element like div, p, span, etc.
  customClassname?: string;
  children: React.ReactNode;
}

const variantClasses: Record<string, string> = {
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  h4: 'text-h4',
  body: 'text-body',
  'body-lg': 'text-body-lg',
  caption: 'text-caption',
  overline: 'text-overline',
  'caption-xs': 'text-caption-xs',
};

const weightClasses: Record<string, string> = {
  regular: 'font-regular',
  medium: 'font-medium',
  semiBold: 'font-semibold',
  bold: 'font-bold',
};

const colorClasses: Record<string, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  dark: 'text-dark',
  light: 'text-light',
  grey: 'text-grey',
  success: 'text-success',
  error: 'text-red-400',
  warning: 'text-warning',
  info: 'text-info',
};

const letterSpacingClasses: Record<string, string> = {
  tight: 'tracking-tight',
  normal: 'tracking-normal',
  wide: 'tracking-wide',
};

const Typography: React.FC<TypographyProps> = ({
  variant = 'body', // Default to body text
  weight = 'regular', // Default to regular weight
  color = 'dark', // Default to dark text color
  letterSpacing = 'normal', // Default to normal letter-spacing
  component: Component = 'p', // Default to <p> element
  customClassname = '',
  children,
}) => {
  return (
    <Component
      className={clsx(
        variantClasses[variant],
        weightClasses[weight],
        colorClasses[color],
        letterSpacingClasses[letterSpacing],
        customClassname,
      )}
    >
      {children}
    </Component>
  );
};

export default Typography;
