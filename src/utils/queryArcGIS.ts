export async function queryArcGISFeatureService(geoJson: any, serviceUrl: string): Promise<any> {
    // Convert GeoJSON to ArcGIS Geometry
    let arcGISGeometry = convertGeoJSONToArcGIS(geoJson);

    // Define the query parameters as an object
    const queryParams = {
        geometry: JSON.stringify(arcGISGeometry),
        geometryType: 'esriGeometryPolygon',
        inSR: '4326',
        outSR: '4326',
        f: 'json',
        outFields: '*'
    };

    // Use URLSearchParams to construct the query string
    const queryString = new URLSearchParams(queryParams).toString();

    // Construct the Query URL
    let queryUrl = `${serviceUrl}/query?${queryString}`;

    // Send the Request
    try {
        let response = await fetch(queryUrl);
        if (response.ok) {
            let data = await response.json();
            console.log(data);
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
        spatialReference: { wkid: 4326 }
    };

    return arcGISPolygon;
}

export function arcGISResponseToGeoJSON(arcGISResponse: any): any {
    if (!arcGISResponse || !arcGISResponse.features) {
        throw new Error("Invalid ArcGIS response: Missing features");
    }

    // only querying 1 layer, can only have 1 geom type
    const geomType = arcGISResponse.geometryType.split(/(?=[A-Z])/).at(-1)

    const geoJSONFeatures = arcGISResponse.features.map((feature: any) => {
        return {
            type: "Feature",
            geometry: {
                type: geomType,
                coordinates: [feature.geometry.rings[0].reverse()]
            },
            properties: feature.attributes
        };
    });

    return {
        type: "FeatureCollection",
        features: geoJSONFeatures
    };
}
