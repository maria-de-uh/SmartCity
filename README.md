# SmartCity

A digital twin visualization workspace for smart city mapping and simulation.

This repository contains a React + Vite web application in the `digital-twin` folder. The app uses Cesium for 3D map rendering, Tailwind CSS for styling, and GeoJSON assets for city infrastructure layers.

## Structure

- `digital-twin/` — main frontend application
- `digital-twin/src/` — React source files
- `digital-twin/public/geojson/` — GeoJSON layers for city boundaries, lakes, landmarks, parks, railways, rivers, and roads

## Getting Started

1. Open a terminal in the root folder.
2. Change into the frontend folder:
   ```bash
   cd digital-twin
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Build

To build the production bundle:

```bash
npm run build
```

## Notes

- The app is built with Vite and React.
- It uses `vite-plugin-cesium` to integrate Cesium assets into the build.
- The `digital-twin/README.md` contains the default Vite React template content.
