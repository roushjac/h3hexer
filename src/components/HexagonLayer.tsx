import React from 'react';
import { useRecoilValue } from 'recoil';
import { hexPolygonsState } from '../state/hexPolygonsState';
import { useMap, GeoJSON } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import { GeoJsonObject } from 'geojson';

const HexagonLayer: React.FC = () => {
    const hexPolygonFeatures = useRecoilValue(hexPolygonsState);

    const map = useMap();

    const [geoJsonKey, setGeoJsonKey] = useState(Date.now()); // trick to force re-render of leaflet GeoJSON component

    useEffect(() => {
        if (hexPolygonFeatures) {
            const geoJsonLayer = L.geoJSON(hexPolygonFeatures as GeoJsonObject); // Create a temporary Leaflet GeoJSON layer
            const bounds = geoJsonLayer.getBounds(); // Get bounds of the GeoJSON layer
            if (bounds.isValid()) {
                map.fitBounds(bounds); // Fit map to bounds
            }
            setGeoJsonKey(Date.now()); // Manually change key to force leaflet GeoJSON component to re-render
        }
    }, [hexPolygonFeatures, map]);

    const onEachFeature = (feature: any, layer: any) => {
        if (feature.properties) {
            const popupContent = `<pre>${JSON.stringify(
                feature.properties,
                null,
                2
            )}</pre>`;
            layer.bindPopup(popupContent);
        }
    };

    return (
        hexPolygonFeatures && (
            <GeoJSON
                key={geoJsonKey}
                data={hexPolygonFeatures as GeoJsonObject}
                onEachFeature={onEachFeature}
            />
        )
    );
};

export default HexagonLayer;
