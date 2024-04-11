import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import celestialBodies from "./planets";

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
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
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

function createRing(size, texture) {
  const meshTexture = new THREE.TextureLoader().load(texture);
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(size[0], size[1], size[2], size[3]),
    new THREE.MeshBasicMaterial({
      map: meshTexture,
    })
  );
  return ring;
}

function createPlanets(celestialBodies) {
  const planets = {};
  celestialBodies.forEach((body) => {
    const planetTexture = new THREE.TextureLoader().load(body.texture);
    const planetMesh = new THREE.Mesh(
      new THREE.SphereGeometry(body.size[0], body.size[1], body.size[2]),
      new THREE.MeshBasicMaterial({ map: planetTexture })
    );
    planets[body.name] = planetMesh;
  });
  return planets;
}

const {
  sun,
  mercury,
  venus,
  earth,
  mars,
  saturn,
  jupiter,
  neptune,
  uranus,
  pluto,
} = createPlanets(celestialBodies);

sun.position.set(0, 0, 0);
const sunGroup = new THREE.Group();
sunGroup.add(sun);
scene.add(sunGroup);

mercury.position.set(60, 0, 0);
const mercuryGroup = new THREE.Group();
mercuryGroup.add(mercury);
scene.add(mercuryGroup);

venus.position.set(70, 0, 0);
const venusGroup = new THREE.Group();
venusGroup.add(venus);
scene.add(venusGroup);

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

mars.position.set(90, 0, 0);
scene.add(mars);

jupiter.position.set(100, 0, 0);
scene.add(jupiter);

saturn.position.set(110, 0, 0);
const saturnRing = createRing([4, 1, 2, 100], "saturn.jpg");
saturnRing.position.set(110, 0, 0);
saturnRing.rotation.x = Math.PI / 0.3;

const saturnGroup = new THREE.Group();
saturnGroup.add(saturn, saturnRing);
scene.add(saturnGroup);

uranus.position.set(120, 0, 0);
const uranusRing = createRing([2, 0.1, 24, 18], "uranus.jpg");
uranusRing.position.set(120, 0, 0);
uranusRing.rotation.x = Math.PI / 1.8;

const uranusGroup = new THREE.Group();
uranusGroup.add(uranus, uranusRing);
scene.add(uranusGroup);

neptune.position.set(130, 0, 0);
scene.add(neptune);

pluto.position.set(140, 0, 0);
scene.add(pluto);

function updateTextRotation(mesh) {
  function update() {
    mesh.lookAt(camera.position);
    requestAnimationFrame(update);
  }
  update();
}

function createText(text, font) {
  const textGeo = new TextGeometry("EARTH", {
    font: font,
    size: 2.5,
    depth: 1,
  });
  const textMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    specular: 0xffffff,
  });
  const mesh = new THREE.Mesh(textGeo, textMaterial);
  return mesh;
}

const loader = new FontLoader();
loader.load("fonts/helvetiker_bold.typeface.json", function (font) {
  const earthLabel = createText("EARTH", font);
  earthLabel.position.set(75, 20, 5);
  earthGroup.add(earthLabel);
  updateTextRotation(earthLabel);
});

function animate() {
  controls.update();
  // updateTextRotation();
  sun.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.0005);
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
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
