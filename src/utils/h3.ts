import * as h3 from 'h3-js';

export const h3PolyfillGeoJSON = (geoJSONString: string) => {
    const geoJSON = JSON.parse(geoJSONString);
    const resolution = 9;
    let allH3Indexes: string[] = [];

    console.log('geoJSON', geoJSON);

    geoJSON.features.forEach((feature: any) => {
        const coordinates = feature.geometry.coordinates;
        const oneFeatureIndexes = h3.polygonToCells(
            coordinates[0],
            resolution,
            true
        );
        allH3Indexes = [...allH3Indexes, ...oneFeatureIndexes];
    });

    console.log('indexes', allH3Indexes);

    // Convert H3 hexagons to GeoJSON
    const h3Polygons = h3.cellsToMultiPolygon(allH3Indexes, false);

    console.log('h3Polygons', h3Polygons);

    return h3Polygons;
};
