export function mergeObjects(arr: Array<any>, mergeKey: string) {
    const resultMap = new Map(); // Create a Map to hold the merged objects

    for (const obj of arr) {
        const key = obj[mergeKey]; // Get the value of the merge key for the current object

        if (!resultMap.has(key)) {
            resultMap.set(key, { ...obj });
        } else {
            const existingObj = resultMap.get(key);

            for (const [k, v] of Object.entries(obj)) {
                if (k === mergeKey) continue; // Skip the merge key

                if (existingObj[k] === undefined) {
                    existingObj[k] = v; // If the key doesn't exist yet, just assign the value
                } else {
                    // If the key already exists, ensure the existing value and the new value are both arrays,
                    // then concatenate them together
                    existingObj[k] = ([] as any[]).concat(
                        existingObj[k] as any,
                        v as any
                    );
                }
            }

            resultMap.set(key, existingObj); // Update the merged object in the resultMap
        }
    }

    return Array.from(resultMap.values())[0]; // Convert the resultMap values to an array and return the first element
}
