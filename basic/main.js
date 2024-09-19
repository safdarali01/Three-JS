// Import the entire THREE.js library
import * as THREE from 'three';

// 1. Create the Scene
// The scene is a container for all the objects, cameras, and lights.
const scene = new THREE.Scene();
scene.background = new THREE.Color('#f0f0f0'); // Set the background color of the scene

// 2. Add the Camera
// The camera defines the viewing angle and perspective.
// PerspectiveCamera simulates a real camera, where 75 is the field of view, aspect ratio is based on window size, and clipping planes define the visible range.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5; // Position the camera back on the Z axis to see the scene

// 3. Create and Add the Cube Object
// A cube geometry is created, then a material (with color and emissive light properties) is applied to it.
// MeshLambertMaterial reacts to lighting in the scene.
const geometry = new THREE.BoxGeometry(); // Create a cube with default dimensions
const material = new THREE.MeshLambertMaterial({ color: '#468585', emissive: '#468585' }); // Set the cube color and light emission
const cube = new THREE.Mesh(geometry, material); // Combine geometry and material into a mesh (3D object)
scene.add(cube); // Add the cube to the scene

// 4. Add Lighting
// A DirectionalLight simulates a light source, like the sun, that illuminates in one direction.
// The color and intensity of the light are specified.
const light = new THREE.DirectionalLight(0x9CDBA6, 10); // Create light with color and intensity
light.position.set(1, 1, 1); // Set the position of the light
scene.add(light); // Add the light to the scene

// 5. Setup the Renderer
// The WebGLRenderer is responsible for rendering the scene to the canvas element in the DOM.
// Set the renderer size to the full window and append it to the document body.
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // Set the size of the rendering area to the window dimensions
document.body.appendChild(renderer.domElement); // Attach the renderer to the document body

// 6. Animate the Scene
// The animate function creates a loop that renders the scene on each frame, making the cube rotate continuously.
function animate() {
  requestAnimationFrame(animate); // Request the browser to call the animate function before the next repaint

  // Rotate the cube slightly on the X and Y axes each frame for animation
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Render the scene from the camera's perspective
  renderer.render(scene, camera);
}

// Start the animation loop
animate();
