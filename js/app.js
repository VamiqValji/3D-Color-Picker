//  ALWAYS NEEDS SCENE, RENDERER, AND CAMERA

let scene, camera, renderer, cube;
// global vars

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // fov, aspect ratio, doesnt display if object is this close,
  // doesnt display is object is this near
  renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  // cube
  geometry = new THREE.BoxGeometry(2, 1, 1);
  material = new THREE.MeshLambertMaterial({
    color: 0x00ff00,
    //   antialias: true,
  });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // light
  const light = new THREE.AmbientLight(0x404040, 2); // soft white light
  scene.add(light);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  scene.add(directionalLight);

  // camera
  camera.position.z = 5;
}

function animate() {
  requestAnimationFrame(animate); // runs based on user's refresh rate
  // Animations here
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
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
