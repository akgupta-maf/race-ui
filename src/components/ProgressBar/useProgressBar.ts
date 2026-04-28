import React from 'react';
import { ProgressBarContext } from './ProgressBarProvider';

export const useProgressBar = () => {
  return React.useContext(ProgressBarContext);
};
