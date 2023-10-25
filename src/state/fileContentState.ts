import { atom } from 'recoil';

export const fileContentState = atom<
    { uid: string; name: string; content: string }[]
>({
    key: 'fileContentState',
    default: [] // Initialize empty list with no files
});
