import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSetRecoilState } from 'recoil';
import { fileContentState } from '../state/fileContentState';
import '../styles/FileUploader.css'

const FileUploader: React.FC = () => {
    const setFileContent = useSetRecoilState(fileContentState);

    const props = {
        beforeUpload: (file: any) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result;
                if (typeof content == 'string') {
                    const fileObj = {
                        uid: file.uid,
                        name: file.name,
                        content: content
                    };
                    // use a functional update with the spread operator to simply add in a new element
                    setFileContent((prevState) => [...prevState, fileObj]);
                } else {
                    message.error('File read error: unexpected content type.');
                }
            };
            reader.readAsText(file);
            // Prevent automatic upload by returning false
            return false;
        },
        onRemove: (file: any) => {
            setFileContent((prevState) => prevState.filter((f) => f.uid !== file.uid)); // Remove the file object with the matching id from the fileContent array
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
