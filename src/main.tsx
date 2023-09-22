import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RecoilRoot>
        {/* <React.StrictMode> */}
        <App />
        {/* </React.StrictMode> */}
    </RecoilRoot>
);
