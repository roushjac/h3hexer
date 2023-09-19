import { CoordPair } from 'h3-js';
import { atom } from 'recoil';

export const hexPolygonsState = atom<CoordPair[][][] | null>({
    key: 'hexPolygonsState',
    default: null
});
