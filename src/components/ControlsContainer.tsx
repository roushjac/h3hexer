import React from 'react';
import WhatIsThis from './WhatIsThis';
import FileUploader from './FileUploader';
import '../styles/ControlsContainer.css';
import DrawingControl from './DrawingControl';
import StartButton from './StartButton';
import FileDownloader from './FileDownloader';
import ResolutionSlider from './ResolutionSlider';
import APIDownloader from './APIDownloader';

const ControlsContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <div className="container">{children}</div>;
};

const ToolComponents: React.FC = () => {
    return (
        <ControlsContainer>
            <WhatIsThis />
            <FileUploader />
            <APIDownloader />
            <DrawingControl />
            <ResolutionSlider />
            <StartButton />
            <FileDownloader />
        </ControlsContainer>
    );
};

export default ToolComponents;
