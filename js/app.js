//  ALWAYS NEEDS SCENE, RENDERER, AND CAMERA

// global vars
let scene, camera, renderer, cube, floor, ambientLight, pointLight; // three js vars

const white = 0xffffff;
const black = 0x000000;
const green = 0x00ff00;

let randomColor = "ffffff"; // color changing var
let displayColorValueBool = false;

let time;
let startTime;
let endTime;

// display color values

let prevColorBtn = document.getElementById("prevColorBtn");
let prevColorText = document.getElementById("prevColorText");

let previousColor;

let prevColorBool = true;

let seenColors = ["ffffff"];
let favoriteColors = ["ffffff"];

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

let count = 0;
let titleTextList = [
  "Like this color?",
  "How long are you gonna go at this?",
  "You're a perfectionist, aren't you?",
  "That's a good one.",
  "Yikes.",
  "My eyes hurt.",
];

let title = document.getElementById("title");
let colorValueTxt = document.getElementById("colorValue");

const hexToRGB = (hex) => {
  let hexed = hex.match(/.{1,2}/g);
  // console.log(hex);
  let rgb = [
    parseInt(hexed[0], 16),
    parseInt(hexed[1], 16),
    parseInt(hexed[2], 16),
  ];
  return `(${rgb[0]},${rgb[1]},${rgb[2]})`;
};

const changeColor = (randColor) => {
  // change color
  floor.material.color.setHex(randColor);
  cube.material.color.setHex(randColor);
  renderer.setClearColor(parseInt(randColor), 1);

  // add to lists

  if (seenColors.includes(randColor) == false) {
    seenColors.push(randColor);
  }

  checkStars();

  // change text value txt

  if (displayColorValueBool) {
    try {
      colorValueTxt.innerHTML = `${randomColor}<br>${hexToRGB(randomColor)}`;
    } catch {
      colorValueTxt.innerHTML = `FFFFFF<br>(255,255,255)`;
    }
  } else {
    colorValueTxt.innerHTML = "";
  }

  // colorValueTxt.innerHTML = displayColorValueBool
  //   ? (colorValueTxt.innerHTML = `#${randomColor}<br>${hexToRGB(randomColor)}`)
  //   : (colorValueTxt.innerHTML = "");

  // change title txt
  if (count % Math.floor(Math.random() * 10 + 1) == 0) {
    let listIndex = Math.floor(Math.random() * titleTextList.length - 1);
    // console.log(title.innerHTML);
    if (
      listIndex == titleTextList.indexOf(title.innerHTML) &&
      listIndex >= titleTextList.length
    ) {
      listIndex--;
    } else {
      listIndex++;
    }
    gsap.from("#title", { y: -10 });
    title.innerHTML = `${titleTextList[listIndex]}`;
    // console.log(listIndex);
  }
  count++;

  displayColorsControllers();
};

const newColor = () => {
  previousColor = randomColor;
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

let resetBtn = document.getElementById("resetBtn");

const resetPosition = () => {
  camera.position.y = 0;
  camera.position.x = 0;
};

resetBtn.addEventListener("click", resetPosition);

let lockBtn = document.getElementById("lockBtn");
let lockBool = false;

const lockBtnFunc = () => {
  // lockBool = true ? false : true;
  if (lockBool === false) {
    lockBool = true;
  } else {
    lockBool = false;
  }
};

lockBtn.addEventListener("click", lockBtnFunc);

const mouseMove = (e) => {
  if (lockBool === false) {
    moveCamera(e.movementX, e.movementY);
  }
};

let dropBtn = document.getElementById("burgerContainer");
gsap.to(".dropDown", { x: -500, duration: 0.25, ease: "power4" });
// gsap.to("#burgerContainer", {
//   background: "none",
//   color: "black",
//   duration: 0.25,
//   ease: "power4",
// });

dropBtn.classList.add("drop");
// gsap.from(dropBtn, { x: -25, duration: 1 });

const dropDown = () => {
  dropBtn.classList.toggle("drop");
  if (dropBtn.classList.contains("drop")) {
    gsap.to(".dropDown", { x: -500, duration: 0.25, ease: "power4" });
  } else {
    gsap.to(".dropDown", { x: 0, duration: 0.25, ease: "power4" });
  }
};

const colorsHolder = document.createElement("div");
colorsHolder.id = "colors";

// let colorsHolder = document.getElementById("colors");

const displayColorsControllers = () => {
  console.log(displayColorValueBool, prevColorBool);
  const addCurrentColor = () => {
    // current
    try {
      colorValueTxt.innerHTML = `${randomColor}<br>${hexToRGB(randomColor)}`;
    } catch {
      colorValueTxt.innerHTML = `FFFFFF<br>(255,255,255)`;
    }
  };

  const addPrevColor = (which = "") => {
    // prev
    try {
      if (which === "") {
        prevColorText.innerHTML = `Previous: ${previousColor}<br>${hexToRGB(
          previousColor
        )}`;
      } else {
        colorValueTxt.innerHTML = `Previous: ${previousColor}<br>${hexToRGB(
          previousColor
        )}`;
      }
    } catch {
      prevColorText.innerHTML = `FFFFFF<br>(255,255,255)`;
    }
  };

  const remove = (which) => {
    if (which === "current") {
      colorValueTxt.innerHTML = "";
    } else if (which === "previous") {
      prevColorText.innerHTML = "";
    } else if (which === "both") {
      colorValueTxt.innerHTML = "";
      prevColorText.innerHTML = "";
    }
  };

  // add both
  if (displayColorValueBool == true && prevColorBool == true) {
    addCurrentColor();
    addPrevColor();
    console.log("1");
    // } else if (displayColorValueBool == true && prevColorBool == false) {
    //   // colorsHolder.innerHTML = `${addCurrentColor()}`;
    //   addCurrentColor();
    //   remove("previous");
    //   console.log("2");
    // } else if (displayColorValueBool == false && prevColorBool == true) {
    //   // colorsHolder.innerHTML = `${addPrevColor()}`;
    //   addPrevColor("moveUp");
    //   remove("current");
    //   console.log("3");
  } else {
    // colorsHolder.innerHTML = ``;
    remove("both");
    console.log("4");
  }
};

dropBtn.addEventListener("click", dropDown);

window.addEventListener("mousemove", mouseMove, false);

let colorValueBtn = document.getElementById("colorValueBtn");

const displayColorValueFunc = () => {
  if (displayColorValueBool === true) {
    displayColorValueBool = false;
  } else {
    displayColorValueBool = true;
  }
  displayColorsControllers();
};

colorValueBtn.addEventListener("click", displayColorValueFunc);

let copyBtn = document.getElementById("copy");
let valuePlaceHolder = document.getElementById("valuePlaceholder");

const copyToClipboard = () => {
  let selectCopyValue = document.getElementById("selectCopyValue");
  // console.log(selectCopyValue.value);

  let returnValuePlaceHolder;
  if (selectCopyValue.value === "RGB") {
    try {
      returnValuePlaceHolder = `${hexToRGB(randomColor)}`;
    } catch {
      returnValuePlaceHolder = `FFFFFF`;
    }
  } else if (selectCopyValue.value === "HEX") {
    try {
      returnValuePlaceHolder = `${randomColor}`;
    } catch {
      returnValuePlaceHolder = `(255,255,255)`;
    }
  }

  valuePlaceHolder.innerHTML = returnValuePlaceHolder;
  valuePlaceHolder.select();
  valuePlaceHolder.setSelectionRange(0, 99999);
  document.execCommand("copy");

  alert(`'${returnValuePlaceHolder}' copied.`);
};

copyBtn.addEventListener("click", copyToClipboard);

// ui off btn

let UIBtn = document.getElementById("UIBtn");

let uiBool = true;

let uiAnimationOn = {
  display: "flex",
  ease: "power4.out",
  opacity: 1,
  duration: 0.25,
};

let uiAnimationOff = {
  display: "none",
  opacity: 0,
  duration: 0.25,
};

const uiFunc = () => {
  if (uiBool) {
    gsap.to("#colorValue", uiAnimationOff);
    gsap.to("#title", uiAnimationOff);
    gsap.to(".changeColorBtn", uiAnimationOff);
    UIBtn.innerHTML = "UI On";
    uiBool = false;
  } else {
    gsap.to("#colorValue", uiAnimationOn);
    gsap.to("#title", uiAnimationOn);
    gsap.to(".changeColorBtn", uiAnimationOn);
    UIBtn.innerHTML = "UI Off";
    uiBool = true;
  }
};

UIBtn.addEventListener("click", uiFunc);

// display previous color

// prevColorBtn.addEventListener("click", () => {
//   if (prevColorBool) {
//     prevColorBool = false;
//   } else {
//     prevColorBool = true;
//   }
//   displayColorsControllers();
//   //   // prevColorBool = (true) ? false : true
// });

// stars

let starsDiv = document.getElementById("stars");

let starsBool = false;

let fullStar = `<i class="fas fa-star"></i>`;
let emptyStar = `<i class="far fa-star"></i>`;

const checkStars = () => {
  if (favoriteColors.includes(randomColor)) {
    starsDiv.innerHTML = fullStar;
  } else {
    starsDiv.innerHTML = emptyStar;
  }
  console.log(favoriteColors, seenColors);
};

const addStarsFunc = () => {
  if (starsBool) {
    starsDiv.innerHTML = emptyStar;
    favoriteColors.push(randomColor);
    starsBool = false;
  } else {
    starsDiv.innerHTML = fullStar;

    // let randomColor = "f";
    // let favoriteColors = ["f"];
    // let tempVar = favoriteColors.filter((color) => color !== randomColor);
    starsBool = true;
  }
};

checkStars();

starsDiv.addEventListener("click", addStarsFunc);
