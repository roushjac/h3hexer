import { GeoJson } from '../types/geojson';
import { atom } from 'recoil';

export const hexPolygonsState = atom<GeoJson | null>({
    key: 'hexPolygonsState',
    default: null
});
