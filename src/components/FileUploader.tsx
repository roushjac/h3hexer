import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSetRecoilState } from 'recoil';
import { fileContentState } from '../state/fileContentState';

const FileUploader: React.FC = () => {
    const setFileContent = useSetRecoilState(fileContentState);

    const props = {
        beforeUpload: (file: any) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result;
                setFileContent(content);
            };
            reader.readAsText(file);

            // Prevent automatic upload by returning false
            return false;
        },
        onRemove: () => {
            setFileContent(null);
        },
        onChange(info: any) {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    };

    return (
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload File</Button>
        </Upload>
    );
};

export default FileUploader;
