import { Button } from 'antd';
import { useSetRecoilState } from 'recoil';
import { shouldProcessState } from '../state/shouldProcessState';

const StartButton: React.FC = () => {
    const setShouldProcess = useSetRecoilState(shouldProcessState);

    const handleClick = () => {
        setShouldProcess(true); // Set to true to trigger processing
    };

    return (
        <Button type="primary" onClick={handleClick}>
            Go
        </Button>
    );
};

export default StartButton;
