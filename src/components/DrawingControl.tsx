import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';
import { Button } from 'antd';
import '../styles/DrawingControl.css';
import { useSetRecoilState } from 'recoil';
import { drawnPolygonsState } from '../state/drawnPolygonsState';

const DrawingControl: React.FC = () => {
    const map = useMap();
    const drawControlRef = useRef<HTMLDivElement>(null);
    const setDrawnPolygonsState = useSetRecoilState(drawnPolygonsState);

    const handleClick = () => {
        // remove all layers except base map layer
        map.eachLayer((layer) => {
            if (!layer.hasOwnProperty('_url')) {
                map.removeLayer(layer);
            }
        });
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
            // console.log(Object.isExtensible(layer));
            // setDrawnPolygonsState((prevPolys) => {
            //     console.log(Object.isExtensible(prevPolys));
            //     console.log(prevPolys);
            //     return [...prevPolys, layer];
            // });
            map.addLayer(layer);
            console.log(layer);
            // setDrawnPolygonsState((prevPolys => [...prevPolys, layer.toGeoJSON()]);
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
