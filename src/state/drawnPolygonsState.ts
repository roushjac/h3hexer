import { atom } from 'recoil';
import { GeoJson } from '../types/geojson';

export const drawnPolygonState = atom<GeoJson|null>({
    key: 'drawnPolygonsState',
    default: null // Initialize empty list with no polygons
});
