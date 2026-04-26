"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
import { Group } from "three";
import Model from "@/components/models/Camera";

function RotatingModel() {
  const ref = useRef<Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={ref}>
      <Model scale={1} />
    </group>
  );
}

export default function CameraModel() {
  return (
    <Canvas
      camera={{ fov: 45, near: 0.01, far: 100 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 5, 3]} intensity={2} />
      <directionalLight
        position={[-3, 2, -2]}
        intensity={0.6}
        color="#f59e0b"
      />
      <pointLight position={[0, 0.2, 0.3]} intensity={0.8} color="#fbbf24" />

      <Suspense fallback={null}>
        <RotatingModel />
        <Environment preset="city" />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        target={[0, 0.04, 0]}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
      />
    </Canvas>
  );
}
