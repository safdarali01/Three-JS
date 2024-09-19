// Import the entire THREE.js library and the OrbitControls addon
import * as THREE from 'three'; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; 

// Get the canvas element from the HTML document where the 3D scene will be rendered
const canvas = document.getElementById('canvas');

// 1. Create a scene
// The scene is the container that holds all the 3D objects, lights, and cameras.
const scene = new THREE.Scene();
scene.background = new THREE.Color('#f0f0f0'); // Set the background color of the scene

// 2. Create a camera
// The camera defines the point of view for the 3D scene. 
// PerspectiveCamera mimics the perspective of a real camera: fov, aspect ratio, near clipping, far clipping.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5; // Move the camera back along the Z axis so we can view the scene

// 3. Create 3D objects
// Create a dodecahedron geometry and apply a material with color and emissive properties (light emission)
const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshLambertMaterial({ color: '#468585', emissive: '#468585' });
const dodecahedron = new THREE.Mesh(geometry, material); // Combine geometry and material into a mesh (3D object)

// Create a box (plane) below the dodecahedron
const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2); // Box geometry with custom dimensions
const boxMaterial = new THREE.MeshStandardMaterial({ color: '#B4B4B3', emissive: '#B4B4B3' }); // Material with emissive color
const box = new THREE.Mesh(boxGeometry, boxMaterial); // Create a mesh for the box
box.position.y = -1.5; // Position the box slightly below the dodecahedron

// Add both the dodecahedron and the box to the scene
scene.add(dodecahedron);
scene.add(box);

// 4. Add lighting to the scene
// Create a SpotLight to illuminate the 3D objects, which provides focused lighting.
const light = new THREE.SpotLight({ color: 0x006769, intensity: 100 }); // Set the light's color and intensity
light.position.set(1, 1, 1); // Position the light source in the scene
scene.add(light); // Add the light to the scene

// 5. Create the WebGL renderer
// The renderer is responsible for displaying the scene from the camera's point of view on the canvas.
const renderer = new THREE.WebGLRenderer({ canvas }); // Attach the canvas to the renderer
renderer.setSize(window.innerWidth, window.innerHeight); // Set the renderer size to fill the entire window
renderer.setPixelRatio(window.devicePixelRatio); // Set the pixel ratio for high-definition displays

// 6. Add Orbit Controls
// OrbitControls allow the user to interact with the scene by rotating, zooming, and panning the camera.
const controls = new OrbitControls(camera, renderer.domElement); // Attach the controls to the camera and the renderer
controls.enableDamping = true; // Smooth camera movement
controls.dampingFactor = 0.05; // Control how smooth the damping effect is
controls.enableZoom = true; // Enable zooming in and out
controls.enablePan = true; // Allow panning (moving the camera view)

// 7. Create the animation loop
// The animate function is a loop that updates the scene on each frame, allowing for animations.
function animate() {
  requestAnimationFrame(animate); // Request the browser to call this function before the next repaint

  // Rotate the dodecahedron slightly on every frame
  dodecahedron.rotation.x += 0.01;
  dodecahedron.rotation.y += 0.01;

  // Rotate the box slightly on the Y axis
  box.rotation.y += 0.005;

  // Update the controls for smoother interaction
  controls.update();

  // Render the scene from the camera's point of view
  renderer.render(scene, camera);
}

// 8. Handle window resize
// This function ensures that the scene and camera aspect ratio adjust if the window is resized.
window.addEventListener('resize', () => {
  // Update camera aspect ratio and projection matrix when the window size changes
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Adjust the renderer size to the new window dimensions
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the animation loop
animate();
