import { atom } from 'recoil';

export const apiDownloaderState = atom<{ uid: string; name: string; content: string }[]>({
    key: 'apiDownloaderState',
    default: [] // Initialize empty list with no files
});
