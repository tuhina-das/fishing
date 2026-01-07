/*
 * Made by Tuhina Das on 1/4/2026
 * Note: This is my first time using ThreeJS, and my first React project in a minute! I'm going to be making notes as I go to
 * help me catch up to speed :)
 *
 * TODO: Clone fish and animate them a lil more
 */
import * as THREE from "three";

import {
  OrbitControls,
  Sky,
  useTexture,
  MeshTransmissionMaterial,
  Environment,
} from "@react-three/drei";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { CylinderGeometry, FrontSide, PointLight } from "three";
import { useTextures } from "./Textures.jsx";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// Mesh for the sphere container
const SphereContainer = () => {
  return (
    <mesh>
      <sphereGeometry args={[5, 64, 64]} />
      <MeshTransmissionMaterial
        transmission={1}
        roughness={0}
        thickness={0.2}
        chromaticAberration={0.05}
        anisotropy={0.1}
        distortion={0.05}
        distortionScale={0.05}
        temporalDistortion={0}
        side={FrontSide}
        emmissiveIntensity={0.5}
        emmissiveColor={"#006361"}
      />
    </mesh>
  );
};

// Mesh for the water inside the sphere container
const WaterMaterial = () => {
  return (
    <mesh>
      <sphereGeometry args={[4.75, 64, 64]} />
      <meshPhysicalMaterial
        transparent
        opacity={0.7}
        color="#27BEF5"
        roughness={0}
        metalness={0}
        ior={1.33}
        attenuationColor="#27BEF5"
        transmission={1}
        thickness={1.5}
        attenuationDistance={1}
      />
    </mesh>
  );
};

// Dynamic lighting woooo! -- light that follows the camera for when we want the sphere to be opaque
function CameraLight() {
  const { camera } = useThree(); // Grab camera reference from scene
  const lightRef = useRef(); // Then create a reference for the light so we can update its position

  useFrame(() => {
    // For every frame, if the light is there, update the light's position
    if (lightRef.current) {
      lightRef.current.position.copy(camera.position);
    }
  });

  return <pointLight ref={lightRef} intensity={20} color={0xffffff} />;
}

const Fish = () => {
  // Render the fish
  const fish = useLoader(OBJLoader, "../public/assets/fish.obj");
  const texture = useLoader(THREE.TextureLoader, "../public/assets/fish.jpg");
  fish.rotation.x = Math.PI / 2;
  fish.rotation.y = Math.PI;
  fish.position.x = -0.5;
  fish.position.y = -0.5;
  fish.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        map: texture,
      });
    }
  });

  // Animate the fish
  useFrame(() => {
    fish.position.y += Math.sin(Date.now() * 0.001) * 0.01;
  });

  return (
    <>
      <primitive object={fish} scale={0.1} />
    </>
  );
};

function App() {
  return (
    <Canvas
      // TODO: eventually add TWCSS possibly
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Environment preset="city" />
      {/* Skybox for background environment */}
      <Sky
        distance={10000000}
        sunPosition={[0, 100, 0]}
        inclination={0}
        azimuth={0.25}
      />

      {/* Controls for the camera */}
      <OrbitControls enableZoom enablePan enableRotate />

      {/* Background color */}
      <color attach="background" args={["#000000"]} />

      {/* The actual mesh for water container.*/}
      <SphereContainer />
      <WaterMaterial />
      <Fish />
    </Canvas>
  );
}

export default App;
