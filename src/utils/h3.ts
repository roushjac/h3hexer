import * as h3 from 'h3-js';
import { Feature, GeoJson } from '../types/geojson';

interface H3DataItem {
    h3Indexes: string[];
    properties: Record<string, any>;
}

/**
 * Get an array of objects where each object represents a GeoJSON feature
 * and contains its properties and H3 indexes that fill it.
 *
 * @param {string} geoJsonStr - The GeoJSON string
 * @param {number} res - The H3 resolution
 * @returns {H3DataItem[]} - The array of objects
 */
const geoJsonToH3Data = (geoJsonStr: string, res: number): H3DataItem[] => {
    const geoJson: GeoJson = JSON.parse(geoJsonStr);
    return geoJson.features.map((feature) => {
        const coordinates = feature.geometry.coordinates;
        const h3Indexes = h3.polygonToCells(coordinates, res, true); // Assuming GeoJSON format ([lng, lat])
        return {
            h3Indexes,
            properties: feature.properties
        };
    });
};

/**
 * Transform the H3 data objects to a new GeoJSON object.
 *
 * @param {H3DataItem[]} h3Data - The H3 data from geoJsonToH3Data
 * @returns {GeoJson} - The new GeoJSON object
 */
const h3DataToGeoJson = (h3Data: H3DataItem[]): GeoJson => {
    const newFeatures: Feature[] = [];

    h3Data.forEach((data) => {
        const { h3Indexes, properties } = data;
        h3Indexes.forEach((h3Index) => {
            const boundary = h3.cellToBoundary(h3Index, true); // true for GeoJSON format ([lng, lat])
            const polygon: Feature = {
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [boundary]
                },
                properties: {
                    ...properties,
                    h3Index
                }
            };
            newFeatures.push(polygon);
        });
    });

    return {
        type: 'FeatureCollection',
        features: newFeatures
    };
};

/**
 * Wrapper function to turn a geojson into a geojson of hex polygon features
 */

export const geoJsonToh3PolygonFeatures = (
    geoJsonStr: string,
    res: number
): GeoJson => {
    const h3Items: H3DataItem[] = geoJsonToH3Data(geoJsonStr, res);
    return h3DataToGeoJson(h3Items);
};
