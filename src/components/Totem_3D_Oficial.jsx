import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  // Quando o arquivo está na pasta public, o caminho começa direto com barra '/'
  // O Vite entende automaticamente que deve buscar na pasta public/models/
  const { scene } = useGLTF("/models/Totem_3D_Pintado.glb");

  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/Totem_3D_Pintado.glb");