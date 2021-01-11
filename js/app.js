//  ALWAYS NEEDS SCENE, RENDERER, AND CAMERA

// global vars
let scene, camera, renderer, cube, floor, ambientLight, pointLight; // three js vars
let randomColor; // color changing var

const white = 0xffffff;
const black = 0x000000;
const green = 0x00ff00;

let time;
let startTime;
let endTime;

function init() {
  //SETUP
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // fov, aspect ratio, doesnt display if object is this close,
  // doesnt display is object is this near
  renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(white, 1); // background color

  document.body.appendChild(renderer.domElement);

  // ENVIRONMENT

  // cube
  geometry = new THREE.BoxGeometry(2, 1, 1);
  material = new THREE.MeshLambertMaterial({
    color: white,
    // antialias: true,
  });
  cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  cube.position.y = 0.5;
  scene.add(cube);

  geometry = new THREE.BoxGeometry(20, 0.3, 20);
  material = new THREE.MeshLambertMaterial({
    color: white,
    //   antialias: true,
  });
  floor = new THREE.Mesh(geometry, material);
  floor.receiveShadow = true;
  floor.position.y = -1;
  scene.add(floor);

  // LIGHTS
  ambientLight = new THREE.AmbientLight(0x404040, 3); // soft white light
  scene.add(ambientLight);
  //   const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  //   scene.add(directionalLight);
  //   directionalLight.rotation.z = 30;
  pointLight = new THREE.PointLight(white, 1, 100);
  pointLight.position.set(0, 3, 0);
  pointLight.castShadow = true; // default false
  scene.add(pointLight);

  // HELPER
  //   const helper = new THREE.CameraHelper(pointLight.shadow.camera);
  //   scene.add(helper);

  // camera
  camera.position.z = 5;
}

function animate() {
  requestAnimationFrame(animate); // runs based on user's refresh rate
  // Animations here
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;
  //   camera.position.z -= 0.01;
  //   camera.rotation.y -= 0.005;
  renderer.render(scene, camera);
}

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}; // resizes 3d env to fit window when window is resized

window.addEventListener("resize", onWindowResize, false);

init();
animate();

const changeColor = (randColor) => {
  floor.material.color.setHex(randColor);
  cube.material.color.setHex(randColor);
  renderer.setClearColor(parseInt(randColor), 1);
};

const newColor = () => {
  randomColor = Math.floor(Math.random() * 16777215).toString(16);
  changeColor(`0x${randomColor}`);
};

const moveCamera = (movementX, movementY) => {
  startTime = new Date().getTime();
  if (camera.position.x < 1 || camera.position.x > 1) {
    camera.position.x += movementX / 3000;
  }
  if (camera.position.y < 1 || camera.position.y > 1) {
    camera.position.y -= movementY / 3000;
  }
};

// let count = 0;
// let resetMovementSpeed = 0.1;

// setInterval(() => {
//   if (startTime + 2000 < new Date().getTime()) {
//     const lerp = (x, y, a) => {
//       return x * (1 - a) + y * a;
//     };
//     setInterval(() => {
//       console.log("test");
//       if (count <= 1 || count >= 0) {
//         camera.position.x = lerp(camera.position.x, 0, count);
//         console.log(count);
//         console.log(lerp(camera.position.x, 0, count));
//         count += 0.1;
//       }

//       // if (camera.position.x > 0.2) {
//       //   camera.position.x -= resetMovementSpeed;
//       // } else if (camera.position.x < 0.2) {
//       //   camera.position.x += resetMovementSpeed;
//       // }
//       // if (camera.position.y > 0.2) {
//       //   camera.position.y -= resetMovementSpeed;
//       // } else if (camera.position.y < 0.2) {
//       //   camera.position.y += resetMovementSpeed;
//       // }
//       // camera.position.x = 0;
//       // camera.position.y = 0;
//     }, 5);
//   }
// }, 2000);

const resetPosition = () => {
  camera.position.y = 0;
  camera.position.x = 0;
};

const mouseMove = (e) => {
  // console.log(e.movementX);
  moveCamera(e.movementX, e.movementY);
};

let dropBtn = document.getElementById("burgerContainer");

// gsap.from(dropBtn, { x: -25, duration: 1 });

const dropDown = () => {
  console.log("test");
  dropBtn.classList.toggle("drop");
  if (dropBtn.classList.contains("drop")) {
    gsap.to(".dropDown", { x: -500, duration: 0.25, ease: "power4" });
  } else {
    gsap.to(".dropDown", { x: 0, duration: 0.25, ease: "power4" });
  }
};

dropBtn.addEventListener("click", dropDown);

window.addEventListener("mousemove", mouseMove, false);
