import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';

const DrawingControl: React.FC = () => {
    const map = useMap();
    const drawControlRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const drawControl = new L.Control.Draw({
            draw: {
                polyline: false,
                circlemarker: false,
                marker: false
            }
        });

        const drawControlContainer = L.DomUtil.create(
            'div',
            'leaflet-draw-container'
        );
        if (drawControlContainer) {
            //@ts-ignore
            drawControlContainer.appendChild(drawControl.onAdd(map));
        }
        if (drawControlRef.current) {
            drawControlRef.current.appendChild(drawControlContainer);
        }

        map.on(L.Draw.Event.CREATED, function (e) {
            const layer = (e as any).layer;
            map.addLayer(layer);
            // const data = layer.toGeoJSON();
            console.log(layer.toGeoJSON());
        });

        return () => {
            // Cleanup
            map.off(L.Draw.Event.CREATED);
        };
    }, [map]);

    return <div ref={drawControlRef} className="drawing-control-container" />;
};

export default DrawingControl;
