export interface Feature {
    type: string;
    geometry: {
        type: string;
        coordinates: number[][][];
    };
    properties: Record<string, any>;
}

export interface GeoJson {
    type: string;
    features: Feature[];
}
