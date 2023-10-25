import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { fileContentState } from './state/fileContentState';
import { hexPolygonsState } from './state/hexPolygonsState';
import { geoJsonToh3PolygonFeatures } from './utils/h3';
import { mergeGeoJsonObjects } from './utils/mergeObjects';
import HexagonLayer from './components/HexagonLayer';
import ToolComponents from './components/ControlsContainer';
import './App.css';
import FileContentLayer from './components/FileContentLayer';
import { fileContentObject } from './types/fileContent';

const App: React.FC = () => {
    const fileContent = useRecoilValue(fileContentState);
    const setHexData = useSetRecoilState(hexPolygonsState);

    useEffect(() => {
        if (fileContent.length >= 1) {
            const newestFileContent = fileContent.at(-1) as fileContentObject;
            const h3Polygons = geoJsonToh3PolygonFeatures(
                newestFileContent.content,
                9
            );
            if (fileContent.length == 1) {
                setHexData(h3Polygons);
            } else {
                // two or more layers, merge the hexed result
                // prevh3Polys guaranteed to be non-null because hexData will always be populated in this condition
                setHexData((prevh3Polys: any) =>
                    mergeGeoJsonObjects(prevh3Polys, h3Polygons, 'h3Index')
                );
            }
        }
    }, [fileContent]);

    return (
        <div className="map-wrapper">
            <MapContainer
                center={[38.505, -95.09]}
                zoom={5}
                scrollWheelZoom={true}
                style={{ minHeight: '100vh', minWidth: '100vw' }}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ToolComponents />
                <LayersControl position="topleft">
                    <LayersControl.Overlay checked name="Hexagons">
                        <HexagonLayer />
                    </LayersControl.Overlay>
                    <FileContentLayer />
                </LayersControl>
            </MapContainer>
        </div>
    );
};

export default App;
