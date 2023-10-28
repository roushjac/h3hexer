import React from 'react';
import { Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSetRecoilState } from 'recoil';
import { apiDownloaderState } from '../state/apiDownloaderState';

const APIDownloader: React.FC = () => {
    const SetApiDownloaderState = useSetRecoilState(apiDownloaderState);

    const handleClick = () => {
        message.info('wire me!');
    };

    return (
        <Button onClick={handleClick} icon={<UploadOutlined />}>
            Get API data
        </Button>
    );
};

export default APIDownloader;
