import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: "red",wireframe:true } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

window.addEventListener('resize', () => {
renderer.setSize(window.innerWidth, window.innerHeight);
camera.aspect=window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
//when ever the window is resized the camera must be updated
});
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 10;
controls.enableZoom = true;
function animate() {
  window.requestAnimationFrame(animate);
	renderer.render( scene, camera );
 
controls.update();
}
animate();
