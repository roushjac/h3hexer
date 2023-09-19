// @ts-nocheck https://github.com/Turfjs/turf/issues/2438
import React from 'react';
import { Polygon } from 'react-leaflet';
import { FeatureCollection } from '@turf/turf';

type Props = {
    hexagonData: FeatureCollection;
};

const HexagonLayer: React.FC<Props> = ({ hexagonFeatures }) => {
    return (
        <>
            {hexagonFeatures.features.map((feature, index) => (
                <Polygon
                    key={index}
                    positions={feature.geometry.coordinates[0]}
                    color="blue"
                />
            ))}
        </>
    );
};

export default HexagonLayer;
