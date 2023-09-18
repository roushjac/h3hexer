import { atom } from 'recoil';

export const fileContentState = atom<any>({
    key: 'fileContentState',
    default: null // Initialize with no file content
});
