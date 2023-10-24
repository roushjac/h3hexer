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
            {fileContent.map((fileObj, index) => {
                const fileContentFeatures = JSON.parse(fileObj.content);
                const layerName =
                    fileContentFeatures.name || `File Content ${index + 1}`; // Use name from GeoJSON or default to "File Content N"
                return (
                    <LayersControl.Overlay
                        key={`overlay-${index}`}
                        checked
                        name={layerName}
                    >
                        <GeoJSON
                            key={`geojson-layer-${index}`}
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
