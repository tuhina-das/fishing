import { useTexture } from "@react-three/drei";

export const useTextures = () => {
  const tile = useTexture("/assets/tile.jpg");
  return { tile };
};
