import { useTexture } from "@react-three/drei";

export const useTextures = () => {
  const tile = useTexture("/assets/tile.jpg");
  const sky = useTexture("/assets/sky.jpeg");
  return { tile, sky };
};
