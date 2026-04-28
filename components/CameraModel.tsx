"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PresentationControls,
} from "@react-three/drei";
import { useRef, Suspense } from "react";
import { Group } from "three";
import Model from "@/components/models/Camera";

function RotatingModel() {
  const ref = useRef<Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={ref}>
      <Model scale={2} /> {/* 👈 double the original size */}
    </group>
  );
}

export default function CameraModel() {
  return (
    <Canvas
      camera={{ position: [0.8, 0.6, 1.2], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 2]}
      shadows
    >
      {/* Lights unchanged... */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 3, 2]} intensity={1.5} castShadow />
      <directionalLight
        position={[-2, 1, -1]}
        intensity={0.5}
        color="#f59e0b"
      />
      <directionalLight position={[1, 1.5, -2]} intensity={0.8} />
      <pointLight position={[0, -0.5, 0]} intensity={0.4} color="#fbbf24" />
      <pointLight position={[1.2, 0.8, 1]} intensity={0.6} color="#ffaa44" />

      <Suspense fallback={null}>
        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.5, Math.PI / 1.5]}
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
        >
          <RotatingModel />
        </PresentationControls>
        <Environment
          preset="studio"
          files="/hdr/lebombo.hdr"
          background={false}
        />
      </Suspense>

      <OrbitControls
        enableZoom={true}
        zoomSpeed={0.8}
        enablePan={false}
        target={[0, 0.1, 0]}
        minDistance={0.5}
        maxDistance={2.5}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.8}
        dampingFactor={0.05}
        enableDamping={true}
      />
    </Canvas>
  );
}
