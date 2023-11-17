async function queryArcGISFeatureService(geoJson: any, serviceUrl: string): Promise<any> {
    // Convert GeoJSON to ArcGIS Geometry
    let arcGISGeometry = convertGeoJSONToArcGIS(geoJson);

    // Construct the Query URL
    let queryUrl = `${serviceUrl}/query?geometry=${encodeURIComponent(JSON.stringify(arcGISGeometry))}&geometryType=<geometryType>&spatialRel=<spatialRel>&outSR=<outSR>&f=json`;

    // Send the Request
    try {
        let response = await fetch(queryUrl);
        if (response.ok) {
            let data = await response.json();
            return data;
        } else {
            console.error('Server responded with an error:', response.statusText);
        }
    } catch (error) {
        console.error('Request failed:', error);
    }
}

function convertGeoJSONToArcGIS(geoJson: any): any {
    if (!geoJson || geoJson.type !== "FeatureCollection" || geoJson.features.length !== 1 || geoJson.features[0].geometry.type !== "Polygon") {
        throw new Error("Invalid GeoJSON: Must be a FeatureCollection with a single Polygon feature.");
    }

    const polygon = geoJson.features[0].geometry;
    const arcGISPolygon = {
        rings: polygon.coordinates,
        spatialReference: { wkid: 4326 } // Assuming WGS 84, update if necessary
    };

    return arcGISPolygon;
}

