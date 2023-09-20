import { MapContainer, TileLayer } from 'react-leaflet';
import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { fileContentState } from './state/fileContentState';
import { hexPolygonsState } from './state/hexPolygonsState';
import { geoJsonToh3PolygonFeatures } from './utils/h3';
import HexagonLayer from './components/HexagonLayer';
import ToolComponents from './components/ControlsContainer';
import './App.css';

const App: React.FC = () => {
    const fileContent = useRecoilValue(fileContentState);
    const setHexData = useSetRecoilState(hexPolygonsState);

    useEffect(() => {
        if (fileContent) {
            const h3Polygons = geoJsonToh3PolygonFeatures(fileContent, 9);
            setHexData(h3Polygons);
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
                <HexagonLayer />
            </MapContainer>
        </div>
    );
};

export default App;
