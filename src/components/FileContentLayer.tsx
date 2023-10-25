import React from 'react';
import { useRecoilValue } from 'recoil';
import { fileContentState } from '../state/fileContentState';
import { GeoJSON, LayersControl } from 'react-leaflet';
import { GeoJsonObject } from 'geojson';

const FileContentLayer: React.FC = () => {
    const fileContent = useRecoilValue(fileContentState);

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
        <>
            {fileContent.map((fileObj) => {
                const fileContentFeatures = JSON.parse(fileObj.content);
                const layerName = fileObj.name;
                return (
                    <LayersControl.Overlay
                        key={layerName}
                        checked
                        name={layerName}
                    >
                        <GeoJSON
                            key={layerName}
                            data={fileContentFeatures as GeoJsonObject}
                            onEachFeature={onEachFeature}
                        />
                    </LayersControl.Overlay>
                );
            })}
        </>
    );
};

export default FileContentLayer;
