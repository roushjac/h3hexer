import React from 'react';
import { Polygon } from 'react-leaflet';
import { useRecoilValue } from 'recoil';
import { CoordPair } from 'h3-js';
import { hexPolygonsState } from '../state/hexPolygonsState';

const HexagonLayer: React.FC = () => {
    const hexFeatures = useRecoilValue(hexPolygonsState);

    return (
        <>
            {hexFeatures &&
                hexFeatures.map((feature: CoordPair[][], index: number) => (
                    <Polygon key={index} positions={feature} color="blue" />
                ))}
        </>
    );
};

export default HexagonLayer;
