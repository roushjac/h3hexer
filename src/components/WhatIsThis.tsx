import React from 'react';
import { Button, Popover } from 'antd';

const content = (
    <div>
        <p>h3hexer indexes geographic data into <a href="https://www.uber.com/blog/h3/">Uber's H3 index</a>.</p>
        <p>Upload one or more GeoJSON files to get started. Coming soon - API data pulls, for example from an Esri ArcGIS Feature Service.</p>
        <p>The properties of the input data are propagated into the resulting hexes. <br></br>If input polygons are overlapping with the same property, 
            resulting hexes will have these properties combined into a list.</p>
        <a href="https://github.com/roushjac/h3hexer">Source repo</a>
    </div>
)

const WhatIsThis: React.FC = () => (
    <Popover content={content} title="h3hexer">
        <Button type="dashed">What is this?</Button>
    </Popover>
);

export default WhatIsThis;