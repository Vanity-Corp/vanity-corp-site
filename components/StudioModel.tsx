"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";
import Model from "@/components/models/Studio";
function RotatingModel() {
  const ref = useRef<Group>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.1; // vitesse de rotation
    }
  });

  return (
    <group ref={ref}>
      <Model scale={0.005} />
    </group>
  );
}
export default function StudioModel() {
  return (
    <Canvas camera={{ position: [8, 4, 12], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <RotatingModel />

      <OrbitControls enableZoom={false} target={[0, 1, 0]} />
    </Canvas>
  );
}
