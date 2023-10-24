import { atom } from 'recoil';

export const fileContentState = atom<{ uid: string; content: string }[]>({
    key: 'fileContentState',
    default: [] // Initialize empty list with no files
});
