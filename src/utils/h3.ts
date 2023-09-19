import * as h3 from 'h3-js';
import { Feature, FeatureCollection, MultiPolygon } from 'geojson';

export const h3PolyfillGeoJSON = (geoJSONString: string) => {
    const geoJSON = JSON.parse(geoJSONString);
    const resolution = 9;
    let allH3Indexes: string[] = [];

    geoJSON.features.forEach((feature: any) => {
        const coordinates = feature.geometry.coordinates;
        const oneFeatureIndexes = h3.polygonToCells(
            coordinates[0],
            resolution,
            true
        );
        allH3Indexes = [...allH3Indexes, ...oneFeatureIndexes];
    });

    // Convert H3 hexagons to multipolygon coordinates
    const h3Polygons = h3.cellsToMultiPolygon(allH3Indexes, false);

    return h3Polygons;
};

type CoordPair = [number, number]; // Latitude, Longitude
type h3CoordSet = CoordPair[][]; // Multiple polygons, each with multiple coordinates

/**
 * Convert h3.CoordPair[][][] to GeoJSON MultiPolygon FeatureCollection
 * @param {h3CoordSet[]} h3Coords - List of h3CoordSets
 * @returns {FeatureCollection<MultiPolygon>} - GeoJSON MultiPolygon FeatureCollection
 */
export const h3ToGeoJSON = (
    h3Coords: h3CoordSet[]
): FeatureCollection<MultiPolygon> => {
    const features: Array<Feature<MultiPolygon>> = h3Coords.map(
        (polygon, index) => {
            // Flip lat and lon for each vertex. Need this because h3 uses lat/lon by default, geojson needs lon/lat
            const flippedPolygon = polygon.map((ring) =>
                ring.map((coordPair) => [coordPair[1], coordPair[0]])
            );

            return {
                type: 'Feature',
                properties: { id: index },
                geometry: {
                    type: 'MultiPolygon',
                    coordinates: [flippedPolygon] // Wrap it in an additional array to comply with the MultiPolygon structure
                }
            };
        }
    );

    return {
        type: 'FeatureCollection',
        features
    };
};
