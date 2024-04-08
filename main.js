import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

// Scene Camera Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Renderer initialization
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setSize(window.innerWidth - 17, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.setZ(100);

const pointLight = new THREE.AmbientLight(0xffffff, 100);
pointLight.position.set(20, 0, 5);
scene.add(pointLight);

// three js helper that shows where the light is located
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper, lightHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.DodecahedronGeometry(0.35, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(400));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// const spaceTexture = new THREE.TextureLoader().load("space.png");
// scene.background = spaceTexture;

const sunTexture = new THREE.TextureLoader().load("sun.jpg");
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(50, 100, 100),
  new THREE.MeshBasicMaterial({
    map: sunTexture,
  })
);
sun.position.set(0, 0, 0);
scene.add(sun);

const mercuryTexture = new THREE.TextureLoader().load("mercury.jpg");
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(0.7, 600, 600),
  new THREE.MeshBasicMaterial({
    map: mercuryTexture,
  })
);
mercury.position.set(60, 0, 0);
scene.add(mercury);

const venusTexture = new THREE.TextureLoader().load("venus.jpg");
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(0.9, 600, 600),
  new THREE.MeshBasicMaterial({
    map: venusTexture,
  })
);
venus.position.set(70, 0, 0);
scene.add(venus);

const earthTexture = new THREE.TextureLoader().load("earth.jpg");
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(1, 600, 600),
  new THREE.MeshBasicMaterial({
    map: earthTexture,
  })
);
earth.position.set(80, 0, 0);

const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(0.25, 100, 100),
  new THREE.MeshBasicMaterial({
    map: moonTexture,
  })
);
moon.position.set(80, 1.5, 1.5);

const earthGroup = new THREE.Group();
earthGroup.add(moon, earth);
scene.add(earthGroup);

const marsTexture = new THREE.TextureLoader().load("mars.jpg");
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(0.7, 600, 600),
  new THREE.MeshBasicMaterial({
    map: marsTexture,
  })
);
mars.position.set(90, 0, 0);
scene.add(mars);

const jupiterTexture = new THREE.TextureLoader().load("jupiter.jpg");
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(2, 600, 600),
  new THREE.MeshBasicMaterial({
    map: jupiterTexture,
  })
);
jupiter.position.set(100, 0, 0);
scene.add(jupiter);

const saturnTexture = new THREE.TextureLoader().load("saturn.jpg");
const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(1.5, 600, 600),
  new THREE.MeshBasicMaterial({
    map: saturnTexture,
  })
);
saturn.position.set(110, 0, 0);

const saturnRing = new THREE.Mesh(
  new THREE.TorusGeometry(4, 1, 2, 100),
  new THREE.MeshBasicMaterial({
    map: saturnTexture,
  })
);
saturnRing.position.set(110, 0, 0);
saturnRing.rotation.x = Math.PI / 0.3;

const saturnGroup = new THREE.Group();
saturnGroup.add(saturn, saturnRing);
scene.add(saturnGroup);

const uranusTexture = new THREE.TextureLoader().load("uranus.jpg");
const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(1, 600, 600),
  new THREE.MeshBasicMaterial({
    map: uranusTexture,
  })
);
uranus.position.set(120, 0, 0);

const uranusRing = new THREE.Mesh(
  new THREE.TorusGeometry(2, 0.1, 24, 18),
  new THREE.MeshBasicMaterial({
    map: uranusTexture,
  })
);
uranusRing.position.set(120, 0, 0);
uranusRing.rotation.x = Math.PI / 1.8;

const uranusGroup = new THREE.Group();
uranusGroup.add(uranus, uranusRing);
scene.add(uranusGroup);

const neptuneTexture = new THREE.TextureLoader().load("neptune.jpg");
const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(1, 600, 600),
  new THREE.MeshBasicMaterial({
    map: neptuneTexture,
  })
);
neptune.position.set(130, 0, 0);
scene.add(neptune);

const plutoTexture = new THREE.TextureLoader().load("pluto.jpg");
const pluto = new THREE.Mesh(
  new THREE.SphereGeometry(1, 600, 600),
  new THREE.MeshBasicMaterial({
    map: plutoTexture,
  })
);
pluto.position.set(140, 0, 0);
scene.add(pluto);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  mercury.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.004);
  venus.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.002);
  earthGroup.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.0001);
  moon.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.01);
  mars.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.00006);
  jupiter.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.0000186);
  saturnRing.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.001);
  saturnGroup.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.00001);
  uranusGroup.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.000009);
  uranusRing.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.0005);
  neptune.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.0000076479);
  pluto.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.00000248);
  renderer.render(scene, camera);
}

animate();
