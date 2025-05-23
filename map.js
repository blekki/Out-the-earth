import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// PerspectiveCamera was 75
let mouseIsHold = false;
let startX = 0; let deltaX = 0;
let startY = 0; let deltaY = 0;

// <> Queternions <>
// var matrix4 = new THREE.Matrix4();
// const quaternion = new THREE.Quaternion();

var camera_position = new THREE.Vector3(0, 0, 0);
var camera_look_at = new THREE.Vector3(0, 0, -1);
var camera_up = new THREE.Vector3(0, 1, 0);
var camera_direction = new THREE.Vector3(0, 0, -1);
var camera_position_delta = new THREE.Vector3(0, 0, 0);

var camera_pitch   = 0;//Math.PI / 360.0;
var camera_heading = 0;//Math.PI / 360.0;

var pitch_quat = new THREE.Quaternion(0, 0, 0, 1);
var heading_quat = new THREE.Quaternion(0, 0, 0, 1);
var temp = new THREE.Quaternion(0, 0, 0, 1);




let object; // 3D object on a global variable
// let objSource = 'space-sphere-ico.glb'; // object to render
let objSource = 'star-map-test.glb';
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
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 0;

camera.rotation.x = 0;
camera.rotation.y = 0;
camera.rotation.z = 0;

// instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); // true allows transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

// add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

// add lights to the scene
// const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
// topLight.position.set(500, 500, 500) //top-left-position
// topLight.castShadow = true;
// scene.add(topLight);

// const ambientLight = new THREE.AmbientLight(0x333333, objSource === "dino" ? 5 : 1);
// scene.add(ambientLight);

// render scene
function animate() {
  requestAnimationFrame(animate);
  
  // <-- here we could add some code to update scene, adding some automatic movement

  if (mouseIsHold) {
    // camera.rotation.x = deltaY;
    // camera.rotation.y = deltaX;
    // camera.rotation.z = deltaX;
    // camera.rotation.y = deltaX;// * Math.cos(deltaY);
    // camera.rotation.z = deltaX;// * Math.sin(deltaY);


    // <> quet <>
    camera_direction.subVectors(camera_look_at, camera_position).normalize();
    var axis = new THREE.Vector3(0, 0, 0);
    axis.crossVectors(camera_direction, camera_up);


    pitch_quat.setFromAxisAngle(axis, camera_pitch);
    heading_quat.setFromAxisAngle(camera_up, camera_heading);
    temp.multiplyQuaternions(pitch_quat, heading_quat);

    camera_direction.applyQuaternion(temp);
    
    // camera.rotation.x = camera_direction.x;
    // camera.rotation.y = camera_direction.y;
    // camera.rotation.z = camera_direction.z;

    // camera_position.add(camera_position_delta);
    camera_look_at.addVectors(camera_position, camera_direction);
    // camera.position.copy(camera_position);
    camera.up.copy(camera_up);
    camera.lookAt(camera_look_at);

    camera_pitch   = 0;
    camera_heading = 0;

    // console.log(camera.rotation.x, camera.rotation.y, camera.rotation.z);
    // camera_position_delta.multiplyScalar(.8);
  }
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
    // deltaX += (e.clientX - startX) / window.innerWidth;
    // deltaY += (e.clientY - startY) / window.innerHeight;
    deltaX = (e.clientX - startX) / window.innerWidth;
    deltaY = (e.clientY - startY) / window.innerHeight;
    startX = e.clientX;
    startY = e.clientY;

    // camera_pitch   = (Math.abs(deltaY) > 0.01) ? deltaY : 0.0;
    // camera_heading = (Math.abs(deltaX) > 0.01) ? deltaX : 0.0;
    camera_pitch   = deltaY;
    camera_heading = deltaX;
    console.log(temp.x, " : ", temp.y);
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