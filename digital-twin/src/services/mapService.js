export const layerDefinitions = [
  {
    key: "boundary",
    label: "District Boundary",
    url: "/geojson/bengaluru-boundary.geojson",
    fallback: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "Bengaluru Urban District" },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [77.36, 12.72],
                [77.80, 12.72],
                [77.80, 13.20],
                [77.36, 13.20],
                [77.36, 12.72],
              ],
            ],
          },
        },
      ],
    },
    color: "#f4cd00",
    fill: "#f4cd00",
    opacity: 0.15,
    lineWidth: 3,
  },
  {
    key: "roads",
    label: "Road Network",
    url: "/geojson/bengaluru-roads.geojson",
    fallback: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "Outer Ring Road" },
          geometry: {
            type: "LineString",
            coordinates: [
              [77.45, 12.88],
              [77.55, 12.95],
              [77.65, 13.04],
            ],
          },
        },
        {
          type: "Feature",
          properties: { name: "MG Road" },
          geometry: {
            type: "LineString",
            coordinates: [
              [77.61, 12.97],
              [77.60, 12.97],
            ],
          },
        },
      ],
    },
    color: "#ffffff",
    fill: "#ffffff",
    opacity: 0.9,
    lineWidth: 2,
  },
  {
    key: "lakes",
    label: "Lakes",
    url: "/geojson/bengaluru-lakes.geojson",
    fallback: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "Bellandur Lake" },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [77.66, 12.92],
                [77.69, 12.92],
                [77.69, 12.95],
                [77.66, 12.95],
                [77.66, 12.92],
              ],
            ],
          },
        },
      ],
    },
    color: "#2d7ff9",
    fill: "#2d7ff9",
    opacity: 0.25,
    lineWidth: 2,
  },
  {
    key: "parks",
    label: "Parks",
    url: "/geojson/bengaluru-parks.geojson",
    fallback: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "Cubbon Park" },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [77.59, 12.98],
                [77.61, 12.98],
                [77.61, 13.00],
                [77.59, 13.00],
                [77.59, 12.98],
              ],
            ],
          },
        },
        {
          type: "Feature",
          properties: { name: "Lalbagh" },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [77.57, 12.95],
                [77.58, 12.95],
                [77.58, 12.97],
                [77.57, 12.97],
                [77.57, 12.95],
              ],
            ],
          },
        },
      ],
    },
    color: "#2fbf71",
    fill: "#2fbf71",
    opacity: 0.25,
    lineWidth: 2,
  },
  {
    key: "railways",
    label: "Railway Lines",
    url: "/geojson/bengaluru-railways.geojson",
    fallback: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "Railway Corridor" },
          geometry: {
            type: "LineString",
            coordinates: [
              [77.50, 12.97],
              [77.56, 12.98],
            ],
          },
        },
      ],
    },
    color: "#4b5563",
    fill: "#4b5563",
    opacity: 0.85,
    lineWidth: 2,
  },
  {
    key: "rivers",
    label: "Rivers",
    url: "/geojson/bengaluru-rivers.geojson",
    fallback: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "Vrishabhavati River" },
          geometry: {
            type: "LineString",
            coordinates: [
              [77.50, 12.85],
              [77.56, 12.91],
            ],
          },
        },
      ],
    },
    color: "#1d4ed8",
    fill: "#1d4ed8",
    opacity: 0.75,
    lineWidth: 2,
  },
  {
    key: "landmarks",
    label: "Landmarks",
    url: "/geojson/bengaluru-landmarks.geojson",
    fallback: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "Vidhana Soudha" },
          geometry: { type: "Point", coordinates: [77.5905, 12.9792] },
        },
        {
          type: "Feature",
          properties: { name: "Cubbon Park" },
          geometry: { type: "Point", coordinates: [77.5960, 12.9760] },
        },
      ],
    },
    color: "#f97316",
    fill: "#f97316",
    opacity: 0.95,
    lineWidth: 2,
  },
];

export const landmarkDefinitions = [
  {
    name: "Vidhana Soudha",
    position: [77.5905, 12.9792],
    description: "State legislature building",
  },
  {
    name: "Cubbon Park",
    position: [77.5960, 12.9760],
    description: "Historic urban park",
  },
  {
    name: "Bangalore Palace",
    position: [77.5926, 12.9988],
    description: "Royal palace landmark",
  },
  {
    name: "Lalbagh",
    position: [77.5802, 12.9507],
    description: "Botanical garden",
  },
  {
    name: "ISKCON Temple",
    position: [77.5947, 13.0093],
    description: "Prominent temple complex",
  },
  {
    name: "Kempegowda International Airport",
    position: [77.7067, 13.1987],
    description: "Main airport gateway",
  },
  {
    name: "MG Road",
    position: [77.6082, 12.9743],
    description: "Historic central avenue",
  },
  {
    name: "Electronic City",
    position: [77.6634, 12.8392],
    description: "Technology district",
  },
  {
    name: "Whitefield",
    position: [77.7490, 12.9990],
    description: "Commercial and residential hub",
  },
  {
    name: "Majestic",
    position: [77.5714, 12.9765],
    description: "Major transit interchange",
  },
];

export const cameraPresets = {
  district: { longitude: 77.5946, latitude: 12.9716, height: 18000 },
  airport: { longitude: 77.7067, latitude: 13.1987, height: 8000 },
  electronicCity: { longitude: 77.6634, latitude: 12.8392, height: 8000 },
  whitefield: { longitude: 77.7490, latitude: 12.9990, height: 8000 },
  mgRoad: { longitude: 77.6082, latitude: 12.9743, height: 5000 },
};
