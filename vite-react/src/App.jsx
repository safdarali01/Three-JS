// Import necessary modules from the react-three library
import { Canvas, useFrame } from "@react-three/fiber"; // Canvas is the 3D rendering surface, useFrame allows animation in each frame
import { OrbitControls, Sparkles } from "@react-three/drei"; // OrbitControls enables camera movement, Sparkles adds particle effects
import { useRef } from "react"; // useRef is used to reference and manipulate a DOM or mesh element directly

// This component represents a rotating 3D object (cube, or in this case, a cylinder) with added sparkles
const RotatingCube = () => {
  // Create a reference for the mesh (3D object) to allow direct manipulation
  const meshRef = useRef();

  // useFrame runs the provided function on every frame (render cycle), allowing us to create animations
  useFrame(() => {
    // Check if the mesh reference is available
    if (meshRef.current) {
      // Rotate the mesh slightly on the X and Y axes on every frame
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  // Return the 3D object mesh (a cylinder with specific materials)
  return (
    <mesh ref={meshRef}> {/* Attach the reference to this mesh */}
      <cylinderGeometry args={[1, 1, 1]} /> {/* Defines the geometry of the object, here it's a cylinder */}
      <meshLambertMaterial color="#468585" emissive="#468585" /> {/* Material properties, defines the color and emissive effect */}
      <Sparkles count={100} scale={1} size={6} speed={0.002} noise={0.2} color="orange" /> {/* Adds sparkles effect around the object */}
    </mesh>
  );
};

// Main component that renders the Canvas and the 3D scene
const App = () => {
  return (
    <Canvas
      // Style the Canvas to cover the entire viewport and center the content
      style={{
        height: "100vh", // Full viewport height
        width: "100vw",  // Full viewport width
        display: "flex", // Flexbox layout to center items
        justifyContent: "center", // Horizontal centering
        alignItems: "center", // Vertical centering
      }}
    >
      {/* OrbitControls allows the user to zoom, pan, and rotate the camera */}
      <OrbitControls enableZoom enablePan enableRotate />
      
      {/* Add a directional light to the scene for lighting the object */}
      <directionalLight position={[1, 1, 1]} intensity={10} color={0x9cdba6} />
      
      {/* Set the background color of the canvas */}
      <color attach="background" args={["#F0F0F0"]} />
      
      {/* Render the RotatingCube component inside the canvas */}
      <RotatingCube />
    </Canvas>
  );
};

export default App; // Export the App component as the default export
