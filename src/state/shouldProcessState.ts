import { atom } from 'recoil';

export const shouldProcessState = atom({
    key: 'shouldProcessState',
    default: false // Default to not processing
});
