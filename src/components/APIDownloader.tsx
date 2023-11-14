import React from 'react';
import { Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import { useSetRecoilState, useRecoilValue } from 'recoil';
// import { apiDownloaderState } from '../state/apiDownloaderState';
// import { drawnPolygonsState } from '../state/drawnPolygonsState';

const APIDownloader: React.FC = () => {
    // const SetApiDownloaderState = useSetRecoilState(apiDownloaderState);
    // get drawn polygons for spatial component of query
    // const drawnPolygons = useRecoilValue(drawnPolygonsState);

    const handleClick = () => {
        message.info('not implemented - wire me!');
    };

    return (
        <div>
            <Button onClick={handleClick} icon={<UploadOutlined />} style={{width: '100%'}}>
                Get API data
            </Button>
        </div>
    );
};

export default APIDownloader;
