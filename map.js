import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 0);
camera.rotation.set(0, 0, 0);
// PerspectiveCamera was 75
let mouseIsHold = false;
let startX = 0; let deltaX = 0;
let startY = 0; let deltaY = 0;

// <> Queternions <>
// properties for camera
var camera_position = new THREE.Vector3(0, 0, 0);
var camera_look_at = new THREE.Vector3(0, 0, -1);
var camera_up = new THREE.Vector3(0, 1, 0);
var camera_direction = new THREE.Vector3(0, 0, -1);
// rotation speed
var camera_pitch   = 0;
var camera_heading = 0;
// everything for queternions
var pitch_quat = new THREE.Quaternion(0, 0, 0, 1);
var heading_quat = new THREE.Quaternion(0, 0, 0, 1);
var temp = new THREE.Quaternion(0, 0, 0, 1);

let object;
let texture  = new THREE.TextureLoader().load(
  "http://127.0.0.1:5500/media/star_map.jpg",
  function () {
    let geometry = new THREE.SphereGeometry(1, 16, 16);
    let material = new THREE.MeshBasicMaterial({map: texture, side: THREE.BackSide});
        object   = new THREE.Mesh(geometry, material);
    console.log('Texture loaded successful: ');
    scene.add(object);
    animate();
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

document.getElementById("container3D").appendChild(renderer.domElement); // add the renderer to the DOM

// render scene
function animate() {
  requestAnimationFrame(animate);
  
  // <-- here we could add some code to update scene, adding some automatic movement

  if (mouseIsHold) {
    // get camera properties
    camera_direction.subVectors(camera_look_at, camera_position).normalize();
    var axis = new THREE.Vector3(0, 0, 0);
    axis.crossVectors(camera_direction, camera_up);

    // apply queternions
    pitch_quat.setFromAxisAngle(axis, camera_pitch);
    heading_quat.setFromAxisAngle(camera_up, camera_heading);
    temp.multiplyQuaternions(pitch_quat, heading_quat);
    camera_direction.applyQuaternion(temp);

    // apply changed on camera
    camera_look_at.addVectors(camera_position, camera_direction);
    camera.up.copy(camera_up);
    camera.lookAt(camera_look_at);

    // reset rotation speed
    camera_pitch   = 0;
    camera_heading = 0;
  }
  renderer.render(scene, camera);
}

// resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


// mouse trigger pack
document.onmousemove = (e) => {
  if (mouseIsHold) {
    deltaX = (e.clientX - startX) / window.innerWidth;
    deltaY = (e.clientY - startY) / window.innerHeight;
    startX = e.clientX;
    startY = e.clientY;

    camera_pitch   = deltaY / camera.zoom;
    camera_heading = deltaX / camera.zoom;
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

document.onwheel = (e) => { // change zoom
  let newZoom = camera.zoom + ((e.deltaY > 0) ? -0.1 : 0.1);
  if (newZoom > 0.5 && newZoom <= 2.5) {
    camera.zoom = newZoom;
    camera.updateProjectionMatrix();
  }
}
// end of pack


// start rendering
animate();