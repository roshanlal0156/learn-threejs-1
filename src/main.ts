import "./style.css";
import * as THREE from "three";
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import {GUI} from 'dat.gui'
// create scene
const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5))

// create camera
const gui = new GUI()
const cubeFolder = gui.addFolder('cube')

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);


camera.position.z = 10

const rotationFolder = cubeFolder.addFolder('rotation')
rotationFolder.add(camera.rotation, 'x', 0, Math.PI * 2)
rotationFolder.add(camera.rotation, 'y', 0, Math.PI * 2)
rotationFolder.add(camera.rotation, 'z', 0, Math.PI * 2)

// create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement)


window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// create cube and place it in scene
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial();
material.wireframe = true


const cube = new THREE.Mesh(geometry, material);

const scale = cubeFolder.addFolder('scale');
scale.add(cube.position, 'x', 0, 20);
scale.add(cube.position, 'y', 0, 20);
scale.add(cube.position, 'z', 0, 20);


scene.add(cube);

const cube2 = new THREE.Mesh(geometry, material);
cube2.position.set(5,0,0)
cube.add(cube2)
let clock = new THREE.Clock()
let delta

// animate
function animate() {
  requestAnimationFrame(animate);
  delta = clock.getDelta()
//   cube.rotation.x += delta
//   cube.rotation.y += delta
//   cube.rotation.z += delta
  renderer.render(scene, camera);
}
animate()
