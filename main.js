// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: "red",wireframe:true } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;
// const canvas = document.querySelector('canvas');
// const renderer = new THREE.WebGLRenderer({canvas});
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// window.addEventListener('resize', () => {
// renderer.setSize(window.innerWidth, window.innerHeight);
// camera.aspect=window.innerWidth/window.innerHeight;
// camera.updateProjectionMatrix();
// //when ever the window is resized the camera must be updated
// });
// const controls = new OrbitControls( camera, renderer.domElement );
// controls.enableDamping = true;
// controls.autoRotate = true;
// controls.autoRotateSpeed = 10;
// controls.enableZoom = true;
// function animate() {
//   window.requestAnimationFrame(animate);
// 	renderer.render( scene, camera );
 
// controls.update();
// }
// animate();

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// ... existing scene and camera setup ...

// Add ambient light for overall scene illumination
const keyLight = new THREE.DirectionalLight(0xffffff, 5);
keyLight.position.set(5, 5, 5);
scene.add(keyLight);

// Fill light (softer light from opposite side)
const fillLight = new THREE.DirectionalLight(0xffffff, 4);
fillLight.position.set(-5, -5, -5);
scene.add(fillLight);

// Rim light (creates highlight edge)
const rimLight = new THREE.DirectionalLight(0xffffff, 4);
rimLight.position.set(5, 0, -5);
scene.add(rimLight);

// Ambient light for overall illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);


let loader = new THREE.TextureLoader();
let color = loader.load("./text/color.jpg")
let roughness=loader.load("./text/metal_0082_roughness_1k.jpg")
let normal=loader.load("./text/normal.png")
let height=loader.load("./text/height.png")
let metallic = loader.load("./tet/metallic.jpg")
let opacity = loader.load("./tet/opacity.jpg")
let ao = loader.load("./tet/ao.jpg")
const geometry = new THREE.SphereGeometry(2, 32, 32);
const material = new THREE.MeshStandardMaterial({ map: color,roughnessMap:roughness,normalMap:normal,aoMap:ao,metalness:1,metalnessMap:metallic,opacity:opacity });
const cube = new THREE.Mesh(geometry, material);





scene.add(cube);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas')
});
renderer.setSize(window.innerWidth, window.innerHeight);


window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 10;
controls.enableZoom = true;
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
