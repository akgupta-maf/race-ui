import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  position = 'top',
  size = 'medium',
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const sizeClasses = {
    small: 'text-xs p-1',
    medium: 'text-sm p-2',
    large: 'text-base p-3',
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  };

  return (
    <div
      className='relative flex items-center max-w-full'
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      {isVisible && (
        <div
          className={`absolute bg-gray-700 text-white rounded shadow-lg ${sizeClasses[size]} ${positionClasses[position]}  min-w-30 max-w-62.5 wrap-break-word text-center z-50`}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
