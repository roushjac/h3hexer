import React from 'react';
import FileUploader from './FileUploader';
import '../styles/ControlsContainer.css';
import DrawingControl from './DrawingControl';
import StartButton from './StartButton';
import FileDownloader from './FileDownloader';

const ControlsContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <div className="container">{children}</div>;
};

const ToolComponents: React.FC = () => {
    return (
        <ControlsContainer>
            <FileUploader />
            <DrawingControl />
            <StartButton />
            <FileDownloader />
        </ControlsContainer>
    );
};

export default ToolComponents;
