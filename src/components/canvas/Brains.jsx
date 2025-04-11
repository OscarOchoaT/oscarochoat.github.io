import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Brain = ({ isMobile }) => {
  const brain = useGLTF("./brain/scene.gltf");

  return (
      <mesh>
        <hemisphereLight intensity={1.15} groundColor="#ffe087" />
        <spotLight
            position={[-20, 50, 10]}
            angle={0.12}
            penumbra={1}
            intensity={1}
            castShadow
            shadow-mapSize={1024}
        />
        <pointLight intensity={1} color="#C8B273" />

        <primitive
            object={brain.scene}
            scale={isMobile ? 1.2 : 1.5}
            position={isMobile ? [-0.5, -1.8, -1.8] : [-0.5, -2.2, -1.5]}
            rotation={[0, 0.5, 0]}
        />
      </mesh>
  );
};

const BrainCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
      <Canvas
          frameloop="demand"
          shadows
          dpr={[1, 2]}
          camera={{ position: [20, 3, 5], fov: 25 }}
          gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
          />
          <Brain isMobile={isMobile} />
        </Suspense>
        <Preload all />
      </Canvas>
  );
};

export default BrainCanvas;