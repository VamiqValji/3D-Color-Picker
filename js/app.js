//  ALWAYS NEEDS SCENE, RENDERER, AND CAMERA

let scene, camera, renderer, cube, floor, ambientLight, pointLight;
// global vars

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
  renderer.setClearColor(0x000000, 1); // background color

  document.body.appendChild(renderer.domElement);

  // ENVIRONMENT

  // cube
  geometry = new THREE.BoxGeometry(2, 1, 1);
  material = new THREE.MeshLambertMaterial({
    color: 0x00ff00,
    // antialias: true,
  });
  cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  cube.position.y = 0.5;
  scene.add(cube);

  geometry = new THREE.BoxGeometry(20, 0.3, 20);
  material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
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
  pointLight = new THREE.PointLight(0xffffff, 1, 100);
  pointLight.position.set(0, 3, 0);
  pointLight.castShadow = true; // default false
  scene.add(pointLight);

  // helper
  const helper = new THREE.CameraHelper(pointLight.shadow.camera);
  scene.add(helper);

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

const changeColor = () => {
  console.log("test");
  floor.material.color.setHex(0x4f0fff);
};
