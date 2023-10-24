import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { fileContentState } from './state/fileContentState';
import { hexPolygonsState } from './state/hexPolygonsState';
import { geoJsonToh3PolygonFeatures } from './utils/h3';
import { mergeObjects } from './utils/mergeObjects';
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
                if (fileContent.length == 1) {
                    setHexData(h3Polygons);
                } else {
                    // two or more layers, merge the hexed result
                    setHexData((prevh3Polys) =>
                        mergeObjects([prevh3Polys, h3Polygons], 'h3_index')
                    );
                }
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
                    <FileContentLayer />
                </LayersControl>
            </MapContainer>
        </div>
    );
};

export default App;
