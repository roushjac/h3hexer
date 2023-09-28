# h3hexer

h3hexer is a website that spatially indexes geographic data into Uber's [H3 index](https://h3geo.org/).

### Run locally

```
npm i
npm run dev
```

### Why H3?
H3 allows for multiple datasets of different geometry types to be easily joined together into a single dataset. Analysis of indexed data is simplified and made extremely performant by the H3 core library which contains algorithms for spatial aggregation, nearest neighbors, shortest path, and more.

### Data sources
- Local or remote URI to any GeoJSON dataset
- Esri REST API services

### Technologies used
- React
- Leaflet
- Recoiljs (state management)
- Vite (build tool and bundling)
- Antd (React components)
