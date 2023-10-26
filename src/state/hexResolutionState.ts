import { atom } from 'recoil';

export const hexResolutionState = atom<number>({
    key: 'hexResolutionState',
    default: 9
});
