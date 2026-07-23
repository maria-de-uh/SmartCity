import { useEffect, useRef } from "react";
import { Viewer } from "cesium";
import { Ion } from "cesium";

Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN;

function Earth() {

    const viewerRef = useRef(null);

    useEffect(() => {

        const viewer = new Viewer(viewerRef.current, {
            animation: false,
            timeline: false
        });

        return () => viewer.destroy();

    }, []);

    return (
        <div
            ref={viewerRef}
            style={{
                width: "100%",
                height: "100vh"
            }}
        />
    );
}

export default Earth;