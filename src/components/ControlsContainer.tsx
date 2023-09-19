import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import FileUploader from './FileUploader';
import '../styles/ControlsContainer.css';
import { RecoilRoot } from 'recoil';

const ControlsContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <div className="container">{children}</div>;
};

const createControl = (components: React.ReactNode) => {
    return L.Control.extend({
        onAdd: function () {
            const div = L.DomUtil.create('div', '');
            const root = createRoot(div);
            root.render(components);
            return div;
        }
    });
};

const ToolComponents: React.FC = () => {
    const map = useMap();
    let control: any = null;

    useEffect(() => {
        const components = (
            <RecoilRoot>
                <ControlsContainer>
                    <FileUploader />
                    {/* Add other components here */}
                </ControlsContainer>
            </RecoilRoot>
        );

        const LeafletControl = createControl(components);
        control = new LeafletControl();
        control.addTo(map);

        return () => {
            if (control && map) {
                map.removeControl(control);
            }
        };
    }, [map]);

    return null; // Return null since this component doesn't render anything itself
};

export default ToolComponents;
