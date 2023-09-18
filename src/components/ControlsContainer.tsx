// Container.tsx
import React from 'react';
import '../styles/ControlsContainer.css'

const ControlsContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default ControlsContainer;
