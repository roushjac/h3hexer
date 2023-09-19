import React from 'react';
import { Polygon } from 'react-leaflet';
import { useRecoilValue } from 'recoil';
import { CoordPair } from 'h3-js';
import { hexPolygonsState } from '../state/hexPolygonsState';
import { h3ToGeoJSON } from '../utils/h3';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';

const HexagonLayer: React.FC = () => {
    const hexMultipolygonCoords = useRecoilValue(hexPolygonsState);

    const map = useMap();

    useEffect(() => {
        if (hexMultipolygonCoords) {
            // convert multipolygon coordinates into valid GeoJSON
            const hexFeatures = h3ToGeoJSON(hexMultipolygonCoords);
            console.log(hexFeatures);
            const geoJsonLayer = L.geoJSON(hexFeatures); // Create a temporary Leaflet GeoJSON layer
            const bounds = geoJsonLayer.getBounds(); // Get bounds of the GeoJSON layer
            if (bounds.isValid()) {
                map.fitBounds(bounds); // Fit map to bounds
            }
        }
    }, [hexMultipolygonCoords, map]);

    return (
        <>
            {hexMultipolygonCoords &&
                hexMultipolygonCoords.map(
                    (feature: CoordPair[][], index: number) => (
                        <Polygon key={index} positions={feature} color="blue" />
                    )
                )}
        </>
    );
};

export default HexagonLayer;
