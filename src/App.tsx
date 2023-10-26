import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { fileContentState } from './state/fileContentState';
import { hexPolygonsState } from './state/hexPolygonsState';
import { shouldProcessState } from './state/shouldProcessState';
import { geoJsonToh3PolygonFeatures } from './utils/h3';
import { mergeGeoJsonObjects } from './utils/mergeObjects';
import HexagonLayer from './components/HexagonLayer';
import ToolComponents from './components/ControlsContainer';
import './App.css';
import FileContentLayer from './components/FileContentLayer';
import { fileContentObject } from './types/fileContent';
import { message } from 'antd';
import { hexResolutionState } from './state/hexResolutionState';

const App: React.FC = () => {
    const fileContent = useRecoilValue(fileContentState);
    const setHexData = useSetRecoilState(hexPolygonsState);
    const [shouldProcess, setShouldProcess] = useRecoilState(shouldProcessState);
    const hexResolution = useRecoilValue(hexResolutionState);

    useEffect(() => {
        if (shouldProcess) {
            // reset hexes when pushing "Go"
            setHexData(null);
            if (fileContent.length >= 1) {
                const firstFileContent = fileContent[0] as fileContentObject;
                let h3Polygons = geoJsonToh3PolygonFeatures(firstFileContent.content, hexResolution);
                // initialize hexData as the result of hexing the first file
                setHexData(h3Polygons);
                // iteratively merge the following datasets onto the first
                for (let i = 1; i < fileContent.length; i++) {
                    h3Polygons = geoJsonToh3PolygonFeatures(fileContent[i].content, hexResolution);
                    // prevh3Polys guaranteed to be non-null because hexData will always be populated in this condition
                    setHexData((prevh3Polys: any) => mergeGeoJsonObjects(prevh3Polys, h3Polygons, 'h3Index'));
                }
            } else {
                message.warning('No input files', 3);
            }
            // reset processing state
            setShouldProcess(false);
        }
    }, [fileContent, shouldProcess]);

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
