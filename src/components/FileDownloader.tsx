import React from 'react';
import { Button, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useRecoilValue } from 'recoil';
import { hexPolygonsState } from '../state/hexPolygonsState';
import { GeoJson } from '../types/geojson';

const FileDownloader: React.FC = () => {
    const hexPolygonFeatures = useRecoilValue(hexPolygonsState);

    const onDownload = (geoJsonData: GeoJson | null): void => {
        if (!geoJsonData) {
            message.warning('No data has been hexed');
            return;
        }
        const blob = new Blob([JSON.stringify(geoJsonData)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.geojson';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <Button type="primary" icon={<DownloadOutlined />} onClick={() => onDownload(hexPolygonFeatures as GeoJson)}>
            Download Hexes
        </Button>
    );
};

export default FileDownloader;
