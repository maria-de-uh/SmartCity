import { useEffect, useMemo, useRef, useState } from "react";
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { cameraPresets, layerDefinitions, landmarkDefinitions } from "../services/mapService";

window.CESIUM_BASE_URL = "https://cdn.jsdelivr.net/npm/cesium@1.143.0/Build/Cesium/";

const viewerOptions = {
  animation: false,
  baseLayerPicker: false,
  fullscreenButton: true,
  geocoder: false,
  homeButton: false,
  infoBox: false,
  navigationHelpButton: false,
  sceneModePicker: false,
  timeline: false,
  selectionIndicator: false,
};

async function createGeoJsonLayer(viewer, layerDefinition) {
  if (!viewer || !viewer.dataSources) {
    return;
  }

  try {
    const response = await fetch(layerDefinition.url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Unable to fetch ${layerDefinition.url}`);
    }

    const geoJson = await response.json();
    const dataSource = await Cesium.GeoJsonDataSource.load(geoJson, {
      clampToGround: true,
    });

    viewer.dataSources.add(dataSource);

    dataSource.entities.values.forEach((entity) => {
      const color = Cesium.Color.fromCssColorString(layerDefinition.color);
      const fillColor = Cesium.Color.fromCssColorString(layerDefinition.fill);

      if (entity.polygon) {
        entity.polygon.material = new Cesium.ColorMaterialProperty(
          fillColor.withAlpha(layerDefinition.opacity)
        );
        entity.polygon.outline = true;
        entity.polygon.outlineColor = color.withAlpha(0.95);
        entity.polygon.outlineWidth = layerDefinition.lineWidth;
        entity.polygon.classificationType = Cesium.ClassificationType.BOTH;
      }

      if (entity.polyline) {
        entity.polyline.material = color.withAlpha(layerDefinition.opacity);
        entity.polyline.width = layerDefinition.lineWidth;
        entity.polyline.classificationType = Cesium.ClassificationType.BOTH;
      }

      if (entity.point) {
        entity.point.pixelSize = 10;
        entity.point.color = color.withAlpha(1);
        entity.point.outlineColor = Cesium.Color.WHITE;
        entity.point.outlineWidth = 1;
      }

      entity.name = entity.properties?.name?.getValue?.() || layerDefinition.label;
    });
  } catch (error) {
    console.warn(`Layer load skipped for ${layerDefinition.key}`, error);
  }
}

function createBaseImagery(viewer) {
  const imageryProvider = new Cesium.UrlTemplateImageryProvider({
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    credit: "© OpenStreetMap contributors",
  });

  viewer.imageryLayers.removeAll();
  viewer.imageryLayers.addImageryProvider(imageryProvider);
}

function createLandmarkEntities(viewer) {
  landmarkDefinitions.forEach((landmark, index) => {
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(landmark.position[0], landmark.position[1], 400),
      point: {
        pixelSize: 10,
        color: Cesium.Color.ORANGE,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
      },
      label: {
        text: landmark.name,
        font: "14px sans-serif",
        fillColor: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        pixelOffset: new Cesium.Cartesian2(0, -20),
      },
      description: landmark.description,
      id: `landmark-${index}`,
    });
  });
}

function flyTo(viewer, target) {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(target.longitude, target.latitude, target.height),
    duration: 3,
    easingFunction: Cesium.EasingFunction.QUADRA_TIC_IN_OUT,
  });
}

export default function Earth() {
  const viewerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeLayer, setActiveLayer] = useState("district");

  const layerButtons = useMemo(
    () => [
      { key: "district", label: "District" },
      { key: "airport", label: "Airport" },
      { key: "electronicCity", label: "Electronic City" },
      { key: "whitefield", label: "Whitefield" },
      { key: "mgRoad", label: "MG Road" },
    ],
    []
  );

  useEffect(() => {
    if (viewerRef.current) {
      return;
    }

    const initializeViewer = async () => {
      const container = document.getElementById("cesiumContainer");
      if (!container) {
        return;
      }

      const viewer = new Cesium.Viewer(container, viewerOptions);
      viewerRef.current = viewer;

      viewer.scene.globe.enableLighting = false;
      viewer.scene.globe.depthTestAgainstTerrain = false;
      viewer.cesiumWidget.creditContainer.style.display = "none";
      viewer.scene.globe.baseColor = Cesium.Color.BLACK;

      createBaseImagery(viewer);

      try {
        await Promise.all(layerDefinitions.map((layerDefinition) => createGeoJsonLayer(viewer, layerDefinition)));
        createLandmarkEntities(viewer);
        setIsLoaded(true);
        flyTo(viewer, cameraPresets.district);
      } catch (error) {
        console.error("Unable to load digital twin layers", error);
      }
    };

    initializeViewer();

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, []);

  const handlePresetChange = (presetKey) => {
    const viewer = viewerRef.current;
    if (!viewer) {
      return;
    }

    setActiveLayer(presetKey);
    flyTo(viewer, cameraPresets[presetKey]);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      <div id="cesiumContainer" style={{ width: "100%", height: "100%", background: "#020617" }} />

      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 10,
          background: "rgba(2, 6, 23, 0.8)",
          color: "#f8fafc",
          borderRadius: 12,
          padding: "16px 18px",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          maxWidth: 320,
        }}
      >
        <h1 style={{ fontSize: 20, margin: "0 0 8px", fontWeight: 700 }}>Bengaluru Urban Digital Twin</h1>
        <p style={{ fontSize: 13, lineHeight: 1.5, margin: 0, color: "#cbd5e1" }}>
          Interactive city view with terrain, roads, parks, lakes, and landmarks.
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          gap: 10,
          padding: "10px 12px",
          borderRadius: 999,
          background: "rgba(2, 6, 23, 0.82)",
          border: "1px solid rgba(255,255,255,0.16)",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {layerButtons.map((button) => (
          <button
            key={button.key}
            type="button"
            onClick={() => handlePresetChange(button.key)}
            style={{
              border: "none",
              borderRadius: 999,
              padding: "8px 12px",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              background: activeLayer === button.key ? "#f59e0b" : "#0f172a",
              color: activeLayer === button.key ? "#0f172a" : "#e2e8f0",
            }}
          >
            {button.label}
          </button>
        ))}
      </div>

      {!isLoaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(2, 6, 23, 0.7)",
            color: "#f8fafc",
            zIndex: 5,
          }}
        >
          Loading Bengaluru Digital Twin...
        </div>
      )}
    </div>
  );
}