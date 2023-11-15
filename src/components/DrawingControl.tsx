import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';
import { Button } from 'antd';
import '../styles/DrawingControl.css';
import { useResetRecoilState } from 'recoil';
// import { useSetRecoilState } from 'recoil';
// import { drawnPolygonsState } from '../state/drawnPolygonsState';
import { hexPolygonsState } from '../state/hexPolygonsState';
import { fileContentState } from '../state/fileContentState';

const DrawingControl: React.FC = () => {
    const map = useMap();
    const drawControlRef = useRef<HTMLDivElement>(null);
    // TODO use this when api requests are implemented since we need to use the drawn poly as spatial filter
    // const setDrawnPolygonsState = useSetRecoilState(drawnPolygonsState);
    const resetHexPolygons = useResetRecoilState(hexPolygonsState);
    const resetFileContents = useResetRecoilState(fileContentState);

    const handleClick = () => {
        // remove all layers except base map layer
        map.eachLayer((layer) => {
            if (!layer.hasOwnProperty('_url')) {
                map.removeLayer(layer);
            }
        });
        // reset states of hexagon layer and all file contents
        resetHexPolygons();
        resetFileContents();
    };

    useEffect(() => {
        const drawControl = new L.Control.Draw({
            draw: {
                polyline: false,
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false
            }
        });

        const drawControlContainer = L.DomUtil.create('div', 'leaflet-draw-container');
        if (drawControlContainer) {
            //@ts-ignore
            drawControlContainer.appendChild(drawControl.onAdd(map));
        }
        if (drawControlRef.current) {
            drawControlRef.current.appendChild(drawControlContainer);
        }

        map.on(L.Draw.Event.CREATED, function (e) {
            const layer: L.Layer = (e as any).layer;
            map.addLayer(layer);
        });

        return () => {
            // Cleanup
            map.off(L.Draw.Event.CREATED);
        };
    }, [map]);

    return (
        <div className="drawing-container">
            <div ref={drawControlRef} />
            <Button type="primary" onClick={handleClick} className="draw-clear-button">
                Clear
            </Button>
        </div>
    );
};

export default DrawingControl;
