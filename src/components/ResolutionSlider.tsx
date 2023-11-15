import React from 'react';
import { useRecoilState } from 'recoil';
import { Slider } from 'antd';
import { useMap } from 'react-leaflet';
import { hexResolutionState } from '../state/hexResolutionState';
import '../styles/ResolutionSlider.css';

const ResolutionSlider: React.FC = () => {
    const [hexResolution, setHexResolution] = useRecoilState(hexResolutionState);

    const map = useMap();

    const handleChange = (value: number) => {
        setHexResolution(value);
    };

    return (
        <div
            className="slider-container"
            onMouseEnter={() => map.dragging.disable()}
            onMouseLeave={() => map.dragging.enable()}
        >
            <span className="slider-title">H3 resolution: ({hexResolution})</span>
            <Slider min={0} max={15} value={hexResolution} onChange={handleChange} className="resolution-slider" />
        </div>
    );
};

export default ResolutionSlider;
