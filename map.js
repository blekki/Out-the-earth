import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let mouseIsHold = false;
let startX = 0; let viewX = 0;
let startY = 0; let viewY = 0;
// let mouseX = window.innerWidth / 2;
// let mouseY = window.innerHeight / 2;
// let controls; // move camera around the scene

let object; // 3D object on a global variable
let objSource = 'space-sphere-ico.glb'; // object to render

// Instantiate a loader for the .gltf file
const loader = new GLTFLoader();
loader.load(
    `http://127.0.0.1:5500/media/${objSource}`,
    function (gltf) {
        // if the file is loaded, add it to the scene
        object = gltf.scene;
        scene.add(object);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded'); // While it is loading, log the progress
    },
    function (error) {
        console.error(error);
    }
);

// instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); // true allows transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
// camera.position.z = objSource === "dino" ? 25 : 500;
camera.position.z = objSource = 0;

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(500, 500, 500) //top-left-position
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objSource === "dino" ? 5 : 1);
scene.add(ambientLight);

//This adds controls to the camera, so we can rotate / zoom it with the mouse
// if (objSource) {
    // controls = new OrbitControls(camera, renderer.domElement);
// }

// render scene
function animate() {
  requestAnimationFrame(animate);
  
  // <-- here we could add some code to update scene, adding some automatic movement

  if (mouseIsHold) {
    // object.rotation.y = mouseX / (window.innerWidth * 3.0);
    // object.rotation.x = mouseY * 1.7 / (window.innerHeight * 3.0);
    camera.rotation.y = viewX;
    camera.rotation.x = viewY;
    //  todo: rotation with quaternions
  }
  // make the camera move
  // object.rotation.y = -3 + mouseX / window.innerWidth * 3;
  // object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
  renderer.render(scene, camera);
}

// resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


// rotation pack
document.onmousemove = (e) => {
  if (mouseIsHold) {
    viewX += (e.clientX - startX) / window.innerWidth;
    viewY += (e.clientY - startY) / window.innerHeight;
    startX = e.clientX;
    startY = e.clientY;
  }
}

document.onmousedown = (e) => {
  mouseIsHold = true;
  startX = e.clientX;
  startY = e.clientY;
}

document.onmouseup = () => {
  mouseIsHold = false;
}
// end of pack


// start rendering
animate();