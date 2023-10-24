import { atom } from 'recoil';

export const fileContentState = atom<{ id: string; content: string }[]>({
    key: 'fileContentState',
    default: [] // Initialize empty list with no files
});
