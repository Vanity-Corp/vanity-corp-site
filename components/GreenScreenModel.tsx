"use client";

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Model from "./models/GreenScreend";
import { Group } from "three";

interface ThreeSceneProps {
  groupRef: React.RefObject<Group>;
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({ groupRef }) => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} />

      <Environment files="/hdr/studio.hdr" />
      <group scale={0.75} position={[0, -2, 0]}>
        <Model />
      </group>

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default function GreenScreenModel() {
  const groupRef = useRef<Group>(null);

  return <ThreeScene groupRef={groupRef} />;
}
