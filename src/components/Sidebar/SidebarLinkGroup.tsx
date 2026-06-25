import React, { useState } from 'react';

type SidebarLinkGroupProps = {
  activecondition: boolean;
  children: (
    handleClick: (e: React.MouseEvent<HTMLAnchorElement>) => void,
    open: boolean,
  ) => React.ReactNode;
};

const SidebarLinkGroup: React.FC<SidebarLinkGroupProps> = (props) => {
  const { children, activecondition } = props;
  const [open, setOpen] = useState(activecondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return <li className='mb-1 last:mb-0'>{children(handleClick, open)}</li>;
};

export default SidebarLinkGroup;
