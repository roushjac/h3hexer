import React from "react";
import { Button } from "antd";
import "../styles/ExampleButton.css"
import { gjsonExample2 } from "../data/gjsonExample";
import { useSetRecoilState } from "recoil";
import { fileContentState } from "../state/fileContentState";
import { useMap } from "react-leaflet";
import L from 'leaflet';
import { GeoJsonObject } from 'geojson';
import { hexResolutionState } from "../state/hexResolutionState";

const ShowExampleButton: React.FC = () => {

    const setFileContent = useSetRecoilState(fileContentState);
    const setHexResolution = useSetRecoilState(hexResolutionState);

    const map = useMap();

    const handleClick = () => {
        setFileContent([{
            uid: '123example123',
            name: 'Example',
            content: JSON.stringify(gjsonExample2)
        }])
        // change map bounds to example data
        const geoJsonLayer = L.geoJSON(gjsonExample2 as GeoJsonObject); // Create a temporary Leaflet GeoJSON layer
        const bounds = geoJsonLayer.getBounds(); // Get bounds of the GeoJSON layer
        if (bounds.isValid()) {
            map.fitBounds(bounds); // Fit map to bounds
        }
        // hardcode res here to match size of example data
        setHexResolution(10);
    };

    return (
        <Button type="dashed" onClick={handleClick} className="example-button">
            Show Example
        </Button>
    );
};

export default ShowExampleButton;