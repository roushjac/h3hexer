import React from "react";
import { Button, message } from "antd";
import "../styles/ExampleButton.css"

const ShowExampleButton: React.FC = () => {

    const handleClick = () => {
        message.info("show example polys")
    };

    return (
        <Button type="dashed" onClick={handleClick} className="example-button">
            Show Example
        </Button>
    );
};

export default ShowExampleButton;