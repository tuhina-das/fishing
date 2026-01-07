/*
 * Made by Tuhina Das on 1/4/2026
 * Note: This is my first time using ThreeJS, and my first React project in a minute! I'm going to be making notes as I go to
 * help me catch up to speed :)
 *
 * TODO:
 * - Make fishies interactive and add pop-ups in response to onClick events
 * - Animate fish better
 * - Water shader
 * - Responsive design
 * - Chatbox
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
import Header from "./Components/Header.jsx";
import FadeIn from "./Components/FadeIn.jsx";

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
      <sphereGeometry args={[4.5, 64, 64]} />
      <meshPhysicalMaterial
        transparent
        opacity={0.55}
        color="#27BEF5"
        roughness={0}
        metalness={0}
        ior={1}
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

// Function to render all 3 fish
const Fish = () => {
  // Render the fishes
  const fish = useLoader(OBJLoader, "../public/assets/fish.obj");
  const texture = useLoader(THREE.TextureLoader, "../public/assets/fish.jpg");
  fish.rotation.x = Math.PI / 2;
  fish.rotation.y = Math.PI;
  fish.rotation.z = -Math.PI;
  fish.position.x = -0.5;
  fish.position.y = -1;
  fish.position.z = -2;
  fish.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        map: texture,
      });
    }
  });

  const fish2 = fish.clone();
  const texture2 = useLoader(THREE.TextureLoader, "../public/assets/fish2.jpg");
  fish2.rotation.y = -Math.PI;
  fish2.rotation.x = Math.PI / 2;
  fish2.rotation.z = Math.PI / 9.532;
  fish2.position.x = 0.5;
  fish2.position.y = -0.6;
  fish2.position.z = 2.5;
  fish2.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        map: texture2,
      });
    }
  });

  const fish3 = fish2.clone();
  const texture3 = useLoader(THREE.TextureLoader, "../public/assets/fish3.jpg");
  fish3.rotation.y = -Math.PI;
  fish3.rotation.x = Math.PI / 2;
  fish3.rotation.z = Math.PI / 6.23461;
  fish3.position.x = 0;
  fish3.position.y = 2.5;
  fish3.position.z = 0.12;
  fish3.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        map: texture3,
      });
    }
  });

  // Animate the fish
  useFrame(() => {
    fish.position.y += Math.sin(Date.now() * 0.001) * 0.01;
    fish2.position.y += Math.sin(Date.now() * 0.000879) * 0.01;
    fish3.position.y += Math.sin(Date.now() * 0.00067) * 0.0023;
  });

  return (
    <>
      <primitive object={fish} scale={0.12} />
      <primitive object={fish2} scale={0.15} />
      <primitive object={fish3} scale={0.09} />
    </>
  );
};

// Static background
const Background = () => {
  const texture = useTexture("../public/assets/sky.jpeg");
  const { scene } = useThree();
  scene.background = texture;
  return null;
};

// Initializing camera position so we're not 'inside' the bubble
const CameraInitializer = () => {
  const { camera } = useThree();
  camera.position.set(0, 0, 10);
};

function App() {
  return (
    <FadeIn>
      <div className="relative w-screen h-screen">
        <Header />

        <Canvas className="w-full h-full">
          // Background, lighting and environment
          <ambientLight intensity={1} color={"#c8ff00ff"} />
          <ambientLight intensity={1} color={"#FF0800"} />
          <Environment preset="city" />
          <Background />
          // Controls for the camera
          <CameraInitializer />
          <OrbitControls enableZoom enablePan enableRotate />
          // The actual sphere with fish/water
          <SphereContainer />
          <WaterMaterial />
          <Fish />
        </Canvas>
      </div>
    </FadeIn>
  );
}

export default App;
