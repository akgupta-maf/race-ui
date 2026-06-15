import React, { PropsWithChildren, useCallback } from 'react';
import { Progress } from './Progress';

export const ProgressBarContext = React.createContext<{
  showProgress: () => void;
  hideProgress: () => void;
}>({ showProgress: () => {}, hideProgress: () => {} });

const ProgressBarProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [showProgressBar, setShowProgressBar] = React.useState(false);
  const showProgress = useCallback(() => {
    setShowProgressBar(true);
  }, []);
  const hideProgress = useCallback(() => {
    setShowProgressBar(false);
  }, []);
  return (
    <ProgressBarContext.Provider value={{ showProgress, hideProgress }}>
      {showProgressBar && <Progress />}
      {children}
    </ProgressBarContext.Provider>
  );
};

export default ProgressBarProvider;
