import { atom } from 'recoil';
import { GeoJson } from '../types/geojson';

export const drawnPolygonsState = atom<GeoJson[]>({
    key: 'drawnPolygonsState',
    default: [] // Initialize empty list with no polygons
});
