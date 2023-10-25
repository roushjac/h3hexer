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
    // Create a map to hold merged features, keyed by the value of the mergeKey.
    const mergedFeaturesMap: { [key: string]: Feature } = {};

    arr.forEach((feature) => {
        // Get the merge key value for the current feature
        const keyVal = feature.properties[mergeKey];

        if (mergedFeaturesMap[keyVal]) {
            // If a feature with this merge key value already exists, merge properties
            for (const propKey in feature.properties) {
                if (feature.properties.hasOwnProperty(propKey)) {
                    if (propKey !== mergeKey) {
                        if (!mergedFeaturesMap[keyVal].properties[propKey]) {
                            // If the property doesn't exist on the merged feature yet, create it
                            mergedFeaturesMap[keyVal].properties[propKey] =
                                feature.properties[propKey];
                        } else if (
                            Array.isArray(
                                mergedFeaturesMap[keyVal].properties[propKey]
                            )
                        ) {
                            // If it's already an array, append the new value
                            mergedFeaturesMap[keyVal].properties[propKey].push(
                                feature.properties[propKey]
                            );
                        } else {
                            // Otherwise, create an array containing both the old and new values
                            mergedFeaturesMap[keyVal].properties[propKey] = [
                                mergedFeaturesMap[keyVal].properties[propKey],
                                feature.properties[propKey]
                            ];
                        }
                    }
                }
            }
        } else {
            // If it's the first feature with this merge key value, just store it in the map
            mergedFeaturesMap[keyVal] = JSON.parse(JSON.stringify(feature));
        }
    });

    // Convert the map values to an array and return it
    return Object.values(mergedFeaturesMap);
}

export function mergeGeoJsonObjects(
    fc1: GeoJson,
    fc2: GeoJson,
    mergeKey: string
): GeoJson {
    const firstFeatures = fc1.features;
    const secondFeatures = fc2.features;
    console.log('first', firstFeatures);
    console.log('second', secondFeatures);
    const mergedFeatures = mergeArrayOfGeoJsonFeatures(
        firstFeatures.concat(secondFeatures),
        mergeKey
    );
    console.log('merged', mergedFeatures);
    return {
        type: 'FeatureCollection',
        features: mergedFeatures
    };
}
