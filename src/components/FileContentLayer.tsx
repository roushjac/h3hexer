import React from 'react';
import { useRecoilValue } from 'recoil';
import { fileContentState } from '../state/fileContentState';
import { GeoJSON } from 'react-leaflet';
import { GeoJsonObject } from 'geojson';

const FileContentLayer: React.FC = () => {
    const fileContent = useRecoilValue(fileContentState);

    const fileContentFeatures = fileContent && JSON.parse(fileContent);

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

    console.log('uploaded file content: ', fileContentFeatures);

    return (
        fileContentFeatures && (
            <GeoJSON
                key="hex-polygon-features"
                data={fileContentFeatures as GeoJsonObject}
                onEachFeature={onEachFeature}
            />
        )
    );
};

export default FileContentLayer;
