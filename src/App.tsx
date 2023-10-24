import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { fileContentState } from './state/fileContentState';
import { hexPolygonsState } from './state/hexPolygonsState';
import { geoJsonToh3PolygonFeatures } from './utils/h3';
import HexagonLayer from './components/HexagonLayer';
import ToolComponents from './components/ControlsContainer';
import './App.css';
import FileContentLayer from './components/FileContentLayer';

const App: React.FC = () => {
    const fileContent = useRecoilValue(fileContentState);
    const setHexData = useSetRecoilState(hexPolygonsState);

    useEffect(() => {
        if (fileContent) {
            fileContent.map((fObj) => {
                const h3Polygons = geoJsonToh3PolygonFeatures(fObj.content, 9);
                // TODO update setHexData to combine properties if hexes are the same
                setHexData(h3Polygons);
            });
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
                    <LayersControl.Overlay checked name="File Content">
                        <FileContentLayer />
                    </LayersControl.Overlay>
                </LayersControl>
            </MapContainer>
        </div>
    );
};

export default App;
