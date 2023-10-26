import React from 'react';
import { useRecoilState } from 'recoil';
import { Slider } from 'antd';
import { hexResolutionState } from '../state/hexResolutionState';
import '../styles/ResolutionSlider.css';

const ResolutionSlider: React.FC = () => {
    const [hexResolution, setHexResolution] = useRecoilState(hexResolutionState);

    const handleChange = (value: number) => {
        setHexResolution(value);
    };

    return (
        <div className="slider-container">
            <span className="slider-title">H3 resolution:</span>
            <Slider min={0} max={15} value={hexResolution} onChange={handleChange} className="resolution-slider" />
        </div>
    );
};

export default ResolutionSlider;
