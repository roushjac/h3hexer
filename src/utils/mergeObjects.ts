import { GeoJson, Feature } from '../types/geojson';

/**
 * Merge an array of GeoJson features on the specified mergeKey. The
 * mergeKey must be contained within the "properties" property
 * of all features in the array.
 */
function mergeArrayOfGeoJsonFeatures(
    arr: Array<Feature>,
    mergeKey: string
): Array<Feature> {
    const mergedFeaturesMap: { [key: string]: Feature } = {};

    arr.forEach((feature) => {
        const keyVal = feature.properties[mergeKey];

        if (mergedFeaturesMap[keyVal]) {
            for (const propKey in feature.properties) {
                if (feature.properties.hasOwnProperty(propKey) && propKey !== mergeKey) {
                    const existingValue = mergedFeaturesMap[keyVal].properties[propKey];
                    const newValue = feature.properties[propKey];
                    if (existingValue === undefined) {
                        mergedFeaturesMap[keyVal].properties[propKey] = newValue;
                    } else if (Array.isArray(existingValue)) {
                        if (Array.isArray(newValue)) {
                            // Flatten and deduplicate arrays
                            newValue.forEach(item => {
                                if (!existingValue.includes(item)) {
                                    existingValue.push(item);
                                }
                            });
                        } else if (!existingValue.includes(newValue)) {
                            existingValue.push(newValue);
                        }
                    } else if (existingValue !== newValue) {
                        // Convert to array and merge
                        mergedFeaturesMap[keyVal].properties[propKey] = [existingValue].concat(newValue instanceof Array ? newValue : [newValue]);
                    }
                }
            }
        } else {
            mergedFeaturesMap[keyVal] = JSON.parse(JSON.stringify(feature));
        }
    });

    return Object.values(mergedFeaturesMap);
}


export function mergeGeoJsonObjects(
    fc1: GeoJson,
    fc2: GeoJson,
    mergeKey: string
): GeoJson {
    const firstFeatures = fc1.features;
    const secondFeatures = fc2.features;
    const mergedFeatures = mergeArrayOfGeoJsonFeatures(
        firstFeatures.concat(secondFeatures),
        mergeKey
    );
    return {
        type: 'FeatureCollection',
        features: mergedFeatures
    };
}
