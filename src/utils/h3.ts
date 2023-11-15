import * as h3 from 'h3-js';
import { Feature, GeoJson } from '../types/geojson';

type H3DataItem ={ [h3Index: string]: { [nestedProperty: string]: string | string[] } }

/**
 * Get an object where each key is an h3Index string
 * and the properties of all features that index into the hex.
 * Features within the GeoJSON that overlap will have the properties merged into a single hex.
 *
 * @param {string} geoJsonStr - The GeoJSON string
 * @param {number} res - The H3 resolution
 * @returns {H3DataItem} - The map of h3 indexes to their properties
 */
const geoJsonToH3Data = (geoJsonStr: string, res: number): H3DataItem => {
    const mergedPropertiesMap: H3DataItem = {};
    const processedH3Indexes = new Set<string>();

    const geoJson: GeoJson = JSON.parse(geoJsonStr);
    geoJson.features.forEach((feature) => {
        const coordinates = feature.geometry.coordinates;
        const h3Indexes = h3.polygonToCells(coordinates, res, true);
        for (const h3Index of h3Indexes) {
            if (processedH3Indexes.has(h3Index)) {
                if (!mergedPropertiesMap[h3Index]) {
                    mergedPropertiesMap[h3Index] = {};
                }
                for (const propKey in feature.properties) {
                    if (feature.properties.hasOwnProperty(propKey)) {
                        const existingValue = mergedPropertiesMap[h3Index][propKey];
                        const newValue = feature.properties[propKey];
                        if (existingValue === undefined) {
                            mergedPropertiesMap[h3Index][propKey] = newValue;
                        } else if (Array.isArray(existingValue)) {
                            if (Array.isArray(newValue)) {
                                // Merge and deduplicate arrays
                                newValue.forEach(item => {
                                    if (!existingValue.includes(item)) {
                                        existingValue.push(item);
                                    }
                                });
                            } else if (!existingValue.includes(newValue)) {
                                existingValue.push(newValue);
                            }
                        } else if (existingValue !== newValue) {
                            mergedPropertiesMap[h3Index][propKey] = [existingValue].concat(newValue instanceof Array ? newValue : [newValue]);
                        }
                    }
                }
            } else {
                mergedPropertiesMap[h3Index] = { ...feature.properties };
                processedH3Indexes.add(h3Index);
            }
        }
    });
    return mergedPropertiesMap;
};

/**
 * Transform the H3 data objects to a new GeoJSON object.
 *
 * @param {H3DataItem} h3Data - The H3 data from geoJsonToH3Data
 * @returns {GeoJson} - The new GeoJSON object
 */
const h3DataToGeoJson = (h3Data: H3DataItem): GeoJson => {
    const newFeatures: Feature[] = [];
    for (const [h3Index, properties] of Object.entries(h3Data)) {
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
    }
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
    const h3Item: H3DataItem = geoJsonToH3Data(geoJsonStr, res);
    return h3DataToGeoJson(h3Item);
};
