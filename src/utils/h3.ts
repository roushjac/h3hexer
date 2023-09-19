// @ts-nocheck https://github.com/Turfjs/turf/issues/2438
import * as h3 from 'h3-js';
import { featureCollection, polygon as turfPolygon } from '@turf/turf';

export const h3PolyfillGeoJSON = (geoJSONString: string) => {
    const geoJson = JSON.parse(geoJSONString);
    const resolution = 9;
    let allH3Indexes: string[] = [];

    geoJson.features.forEach((feature: any) => {
        const coordinates = feature.geometry.coordinates;
        const oneFeatureIndexes = h3.polygonToCells(
            coordinates[0],
            resolution,
            true
        );
        allH3Indexes = [...allH3Indexes, ...oneFeatureIndexes];
    });

    // Convert H3 hexagons to GeoJSON
    const h3Polygons = h3.cellsToMultiPolygon(allH3Indexes);

    return featureCollection(h3Polygons);
};
