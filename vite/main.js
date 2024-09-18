import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js' 

const canvas = document.getElementById('canvas');


// 1. Create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#f0f0f0');

// 2. Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 3. Create a Object
const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshLambertMaterial({ color: '#468585', emissive: '#468585'});
const dodecahedron = new THREE.Mesh(geometry, material);

const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2)
const boxMaterial = new THREE.MeshStandardMaterial({ color: '#B4B4B3', emissive: '#B4B4B3' });
const box = new THREE.Mesh(boxGeometry, boxMaterial);

box.position.y = -1.5;

scene.add(dodecahedron);
scene.add(box);

// 4. Add a light 
const light = new THREE.SpotLight({color: 0x006769, intensity:100})
light.position.set(1, 1, 1);
scene.add(light);

// 5. Create a renderer
const renderer = new THREE.WebGLRenderer({canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// 6. Add Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;

// 7. Animation Loop
function animate() {
  requestAnimationFrame(animate);

  dodecahedron.rotation.x += 0.01;
  dodecahedron.rotation.y += 0.01;
  box.rotation.y += 0.005;
  controls.update();
  renderer.render(scene, camera);
}

// 8. Window resize event
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
);

animate();