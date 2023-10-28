import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';
import { Button } from 'antd';
import '../styles/DrawingControl.css';

const DrawingControl: React.FC = () => {
    const map = useMap();
    const drawControlRef = useRef<HTMLDivElement>(null);

    const drawLayers: L.Layer[] = [];

    const handleClick = () => {
        while (drawLayers.length >= 1) {
            map.removeLayer(drawLayers.pop() as L.Layer);
        }
    };

    useEffect(() => {
        const drawControl = new L.Control.Draw({
            draw: {
                polyline: false,
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
            drawLayers.push(layer);
            console.log((layer as any).toGeoJSON());
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
