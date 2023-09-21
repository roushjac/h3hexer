import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';

const DrawingControl: React.FC = () => {
    const map = useMap();

    useEffect(() => {
        const drawControl = new L.Control.Draw({
            draw: {
                polyline: false,
                circle: false,
                rectangle: false,
                circlemarker: false,
                marker: false
            }
        });
        map.addControl(drawControl);

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

    return null; // The component does not render anything visible
};

export default DrawingControl;
