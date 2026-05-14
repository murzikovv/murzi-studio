import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial, Sparkles, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

function MorphBlob() {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.x = t * 0.18;
      ref.current.rotation.y = t * 0.22;
    }
  });
  return (
    <Float speed={1.3} rotationIntensity={0.8} floatIntensity={1.4}>
      <Icosahedron ref={ref} args={[1.55, 8]}>
        <MeshDistortMaterial
          color={new THREE.Color('#d6ff3a')}
          roughness={0.18}
          metalness={0.65}
          distort={0.45}
          speed={1.6}
          envMapIntensity={1.2}
        />
      </Icosahedron>
    </Float>
  );
}

function Orbiter({ color = '#ff5e3a', radius = 2.8, speed = 0.4, y = 0, size = 0.18 }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (ref.current) {
      ref.current.position.set(Math.cos(t) * radius, y + Math.sin(t * 0.7) * 0.2, Math.sin(t) * radius);
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} roughness={0.3} />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={[0, 0, 0]} />
      <fog attach="fog" args={['#0a0a0f', 6, 14]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 3]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-3, -2, -2]} intensity={1.6} color="#ff3ad6" />
      <pointLight position={[3, 2, -2]} intensity={1.4} color="#38e8ff" />

      <Suspense fallback={null}>
        <MorphBlob />
        <Orbiter color="#ff5e3a" radius={2.6} speed={0.45} y={0.4} size={0.16} />
        <Orbiter color="#38e8ff" radius={3.0} speed={-0.35} y={-0.2} size={0.13} />
        <Orbiter color="#ff3ad6" radius={2.2} speed={0.6}  y={-0.5} size={0.1} />
        <Sparkles count={60} scale={6} size={2.4} speed={0.3} color="#ffffff" />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
