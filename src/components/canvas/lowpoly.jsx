import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';

import CanvasLoader from "../Loader.jsx";
import {useGLTF} from "@react-three/drei";

const LowPoly = () => {
    const lowPoly = useGLTF("./low_poly/scene.gltf");

    return (
        <primitive object={lowPoly.scene} scale={2.5} position-y={0} rotation-y={0} />
    );
};
const LowPoly = () => {
    const meshRef = useRef();
    const cameraRef = useRef();
    const sceneRef = useRef();

    useEffect(() => {
        const geometry = new THREE.IcosahedronGeometry(1, 0);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        meshRef.current = new THREE.Mesh(geometry, material);
        sceneRef.current.add(meshRef.current);

        cameraRef.current.position.z = 5;

        return () => {
        sceneRef.current.remove(meshRef.current);
        };
    }, []);

    return (
        <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <mesh ref={meshRef} />
        <CanvasLoader />
        </Canvas>
    );
}
