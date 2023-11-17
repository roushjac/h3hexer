import React, { useState } from 'react';
import { Button, message, Modal, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { drawnPolygonState } from '../state/drawnPolygonsState';
import { fileContentState } from '../state/fileContentState';
import {v4 as uuidv4} from 'uuid';
import { queryArcGISFeatureService, arcGISResponseToGeoJSON } from '../utils/queryArcGIS';

const APIDownloader: React.FC = () => {
    const drawnPolygons = useRecoilValue(drawnPolygonState);
    const setFileContent = useSetRecoilState(fileContentState);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [serviceUrl, setServiceUrl] = useState('');

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        setIsModalVisible(false);
        try {
            // Assuming drawnPolygons contains a valid GeoJSON Polygon
            const arcGISData = await queryArcGISFeatureService(drawnPolygons, serviceUrl);
            const geoJSONData = arcGISResponseToGeoJSON(arcGISData);
            console.log(geoJSONData);
            const fileObj = {
                uid: uuidv4(),
                name: serviceUrl.split("/").at(-4) as string, //think that's where the name is
                content: JSON.stringify(geoJSONData)
            };
            setFileContent((prevContent) => [...prevContent, fileObj])
        } catch (error) {
            console.error('Error fetching or processing data:', error);
            message.error('Failed to retrieve or process data');
        }
    };
    

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setServiceUrl(e.target.value);
    };

    return (
        <div>
            <Button onClick={showModal} icon={<UploadOutlined />} style={{width: '100%', marginTop: '10px'}}>
                Get API data
            </Button>
            <Modal
                title="Enter Service URL"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input placeholder="Enter URL here" onChange={handleUrlChange} />
            </Modal>
        </div>
    );
};

export default APIDownloader;

// Include the queryArcGISFeatureService and convertGeoJSONToArcGIS functions here

