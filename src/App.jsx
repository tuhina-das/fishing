/*
 * Made by Tuhina Das on 1/4/2026
 * Note: This is my first time using ThreeJS, and my first React project in a minute! I'm going to be making notes as I go to
 * help me catch up to speed :)
 *
 * TODO: Create dynamic lighting and disappearing faces.
 */

import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { CylinderGeometry, PointLight } from "three";
import { useTextures } from "./Textures.jsx";

// Creating a rotating cube object. Involves useRef to get a reference to the specific mesh, a geometry object, and a material.
// UseRef ensures the mesh stays constant.
const SphereContainer = () => {
  const meshRef = useRef();
  const { tile } = useTextures();
  return (
    <mesh ref={meshRef}>
      <sphereGeometry arge={[1, 1, 1]} />
      <meshLambertMaterial map={tile} />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Controls for the camera */}
      <OrbitControls enableZoom enablePan enableRotate />

      {/* Scene lighting */}
      <directionalLight position={[1, 1, 1]} intensity={15} color={0x9cdba6} />

      {/* Background color */}
      <color attach="background" args={["#000000"]} />

      {/* The actual mesh for water container.*/}
      <SphereContainer />
    </Canvas>
  );
};

export default App;
