// src/state/mapState.ts
import { atom } from 'recoil';

export const mapState = atom({
  key: 'mapState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
