import React from 'react';
import FileUploader from './FileUploader';
import '../styles/ControlsContainer.css';

const ControlsContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <div className="container">{children}</div>;
};

const ToolComponents: React.FC = () => {
    return (
        <ControlsContainer>
            <FileUploader />
            {/* Add other components here */}
        </ControlsContainer>
    );
};

export default ToolComponents;
