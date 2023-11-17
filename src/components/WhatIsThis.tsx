import React from 'react';
import { Button, Popover } from 'antd';

const content = (
    <div>
        <p>h3hexer indexes geographic data into <a href="https://www.uber.com/blog/h3/">Uber's H3 index</a>. Select "Show Example" and then "Go" for a quick demo.</p>
        <p>Upload one or more GeoJSON files or enter an ArcGIS Online Feature Service query url. <a href="https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Parks/FeatureServer/0/query">Example</a></p>
        <p>An API query will use the drawn polygon as a spatial filter.</p>
        <p>The properties of the input data are propagated into the resulting hexes. <br></br>If input polygons are overlapping with the same property, 
            resulting hexes will have these properties combined into a list.</p>
        <a href="https://github.com/roushjac/h3hexer">Source repository</a>
    </div>
)

const WhatIsThis: React.FC = () => (
    <Popover content={content} title="h3hexer">
        <Button type="dashed">What is this?</Button>
    </Popover>
);

export default WhatIsThis;