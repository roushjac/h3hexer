import { MapContainer, TileLayer } from 'react-leaflet';
import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { fileContentState } from './state/fileContentState';
import { hexPolygonsState } from './state/hexPolygonsState';
import { h3PolyfillGeoJSON } from './utils/h3';
import HexagonLayer from './components/HexagonLayer';
import ToolComponents from './components/ControlsContainer';
import './App.css';

const App: React.FC = () => {
    const fileContent = useRecoilValue(fileContentState);
    const [hexData, setHexData] = useRecoilState(hexPolygonsState);

    useEffect(() => {
        console.log('fileContent has been updated:', fileContent);
        if (fileContent) {
            const h3Polygons = h3PolyfillGeoJSON(fileContent);
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
                {hexData && <HexagonLayer hexagonData={hexData} />}
            </MapContainer>
        </div>
    );
};

export default App;
