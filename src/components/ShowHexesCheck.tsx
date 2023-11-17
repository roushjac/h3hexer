import { Checkbox, Tooltip } from "antd";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { showHexesState } from "../state/showHexesState";
import { useRecoilState } from "recoil";

const ShowHexesCheck: React.FC = () => {
    const [showHexes, setShowHexes] = useRecoilState(showHexesState);

    const onChange = (e: CheckboxChangeEvent) => {
        setShowHexes(e.target.checked);
    };

    return (
        <Tooltip title="Disable if hexes are causing lag">
            <Checkbox checked={showHexes} onChange={onChange}>Show hexes</Checkbox>
        </Tooltip>
    );
};

export default ShowHexesCheck;