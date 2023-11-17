import React from 'react';
import WhatIsThis from './WhatIsThis';
import ShowExampleButton from './ShowExample';
import FileUploader from './FileUploader';
import '../styles/ControlsContainer.css';
import DrawingControl from './DrawingControl';
import StartButton from './StartButton';
import FileDownloader from './FileDownloader';
import ResolutionSlider from './ResolutionSlider';
import APIDownloader from './APIDownloader';
import ShowHexesCheck from './ShowHexesCheck';

const ControlsContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <div className="container">{children}</div>;
};

const ToolComponents: React.FC = () => {
    return (
        <ControlsContainer>
            <WhatIsThis />
            <ShowExampleButton />
            <FileUploader />
            <APIDownloader />
            <DrawingControl />
            <ResolutionSlider />
            <ShowHexesCheck />
            <StartButton />
            <FileDownloader />
        </ControlsContainer>
    );
};

export default ToolComponents;
