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
const mercuryOrbit = new THREE.Mesh(
  new THREE.TorusGeometry(60, 0.1, 50, 50),
  new THREE.MeshBasicMaterial({
    color: "white",
    transparent: true,
    opacity: 0.5,
  })
);
mercuryOrbit.rotation.x = Math.PI / 2;
const mercuryGroup = new THREE.Group();
mercuryGroup.add(mercury, mercuryOrbit);
scene.add(mercuryGroup);

venus.position.set(70, 0, 0);
const venusOrbit = new THREE.Mesh(
  new THREE.TorusGeometry(70, 0.1, 50, 50),
  new THREE.MeshBasicMaterial({
    color: "white",
    transparent: true,
    opacity: 0.5,
  })
);
venusOrbit.rotation.x = Math.PI / 2;
const venusGroup = new THREE.Group();
venusGroup.add(venus, venusOrbit);
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
const earthOrbit = new THREE.Mesh(
  new THREE.TorusGeometry(80, 0.1, 50, 50),
  new THREE.MeshBasicMaterial({
    color: "white",
    transparent: true,
    opacity: 0.5,
  })
);
earthOrbit.rotation.x = Math.PI / 2;
earthGroup.add(moon, earth, earthOrbit);
scene.add(earthGroup);

mars.position.set(90, 0, 0);
const marsOrbit = new THREE.Mesh(
  new THREE.TorusGeometry(90, 0.1, 50, 50),
  new THREE.MeshBasicMaterial({
    color: "white",
    transparent: true,
    opacity: 0.5,
  })
);
marsOrbit.rotation.x = Math.PI / 2;
const marsGroup = new THREE.Group();
marsGroup.add(mars, marsOrbit);
scene.add(marsGroup);

jupiter.position.set(100, 0, 0);
const jupterOrbit = new THREE.Mesh(
  new THREE.TorusGeometry(100, 0.1, 50, 50),
  new THREE.MeshBasicMaterial({
    color: "white",
    transparent: true,
    opacity: 0.5,
  })
);
jupterOrbit.rotation.x = Math.PI / 2;
const jupiterGroup = new THREE.Group();
jupiterGroup.add(jupiter, jupterOrbit);
scene.add(jupiterGroup);

saturn.position.set(110, 0, 0);
const saturnOrbit = new THREE.Mesh(
  new THREE.TorusGeometry(110, 0.1, 50, 50),
  new THREE.MeshBasicMaterial({
    color: "white",
    transparent: true,
    opacity: 0.5,
  })
);
saturnOrbit.rotation.x = Math.PI / 2;
const saturnRing = createRing([4, 1, 2, 100], "saturn.jpg");
saturnRing.position.set(110, 0, 0);
saturnRing.rotation.x = Math.PI / 0.3;

const saturnGroup = new THREE.Group();
saturnGroup.add(saturn, saturnRing, saturnOrbit);
scene.add(saturnGroup);

uranus.position.set(120, 0, 0);
const urnausOrbit = new THREE.Mesh(
  new THREE.TorusGeometry(120, 0.1, 50, 50),
  new THREE.MeshBasicMaterial({
    color: "white",
    transparent: true,
    opacity: 0.5,
  })
);
urnausOrbit.rotation.x = Math.PI / 2;
const uranusRing = createRing([2, 0.1, 24, 18], "uranus.jpg");
uranusRing.position.set(120, 0, 0);
uranusRing.rotation.x = Math.PI / 1.8;

const uranusGroup = new THREE.Group();
uranusGroup.add(uranus, uranusRing, urnausOrbit);
scene.add(uranusGroup);

neptune.position.set(130, 0, 0);
const neptuneOrbit = new THREE.Mesh(
  new THREE.TorusGeometry(130, 0.1, 50, 50),
  new THREE.MeshBasicMaterial({
    color: "white",
    transparent: true,
    opacity: 0.5,
  })
);
neptuneOrbit.rotation.x = Math.PI / 2;
const neptuneGroup = new THREE.Group();
neptuneGroup.add(neptune, neptuneOrbit);
scene.add(neptuneGroup);

pluto.position.set(140, 0, 0);
const plutoOrbit = new THREE.Mesh(
  new THREE.TorusGeometry(140, 0.05, 50, 50),
  new THREE.MeshBasicMaterial({
    color: "white",
    transparent: true,
    opacity: 0.5,
  })
);
plutoOrbit.rotation.x = Math.PI / 2;
const plutoGroup = new THREE.Group();
plutoGroup.add(pluto, plutoOrbit);
scene.add(plutoGroup);

function updateTextRotation(mesh) {
  function update() {
    mesh.lookAt(camera.position);
    requestAnimationFrame(update);
  }
  update();
}

function createText(text, font) {
  const textGeo = new TextGeometry(text, {
    font: font,
    size: 1,
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
  earthLabel.position.set(earth.position.x - 5, earth.position.y + 20, 0);
  earthGroup.add(earthLabel);
  updateTextRotation(earthLabel);

  const sunLabel = createText("SUN", font);
  sunLabel.position.set(sun.position.x - 5, sun.position.y + 60, 0);
  sunGroup.add(sunLabel);
  updateTextRotation(sunLabel);

  const mercuryLabel = createText("MERCURY", font);
  mercuryLabel.position.set(mercury.position.x - 5, mercury.position.y + 20, 0);
  mercuryGroup.add(mercuryLabel);
  updateTextRotation(mercuryLabel);

  const venusLabel = createText("VENUS", font);
  venusLabel.position.set(venus.position.x - 5, venus.position.y + 20, 0);
  venusGroup.add(venusLabel);
  updateTextRotation(venusLabel);

  const marsLabel = createText("MARS", font);
  marsLabel.position.set(mars.position.x - 5, mars.position.y + 20, 0);
  marsGroup.add(marsLabel);
  updateTextRotation(marsLabel);

  const jupiterLabel = createText("JUPITER", font);
  jupiterLabel.position.set(jupiter.position.x - 5, jupiter.position.y + 20, 0);
  jupiterGroup.add(jupiterLabel);
  updateTextRotation(jupiterLabel);

  const saturnLabel = createText("SATURN", font);
  saturnLabel.position.set(saturn.position.x - 5, saturn.position.y + 20, 0);
  saturnGroup.add(saturnLabel);
  updateTextRotation(saturnLabel);

  const uranusLabel = createText("URANUS", font);
  uranusLabel.position.set(uranus.position.x - 5, uranus.position.y + 20, 0);
  uranusGroup.add(uranusLabel);
  updateTextRotation(uranusLabel);

  const neptuneLabel = createText("NEPTUNE", font);
  neptuneLabel.position.set(neptune.position.x - 5, neptune.position.y + 20, 0);
  neptuneGroup.add(neptuneLabel);
  updateTextRotation(neptuneLabel);

  const plutoLabel = createText("PLUTO", font);
  plutoLabel.position.set(pluto.position.x - 5, pluto.position.y + 20, 0);
  plutoGroup.add(plutoLabel);
  updateTextRotation(plutoLabel);
});

function animate() {
  controls.update();
  // updateTextRotation();
  sun.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.0005);
  mercuryGroup.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.004);
  venusGroup.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.002);
  earthGroup.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.0001);
  moon.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.01);
  marsGroup.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.00006);
  jupiterGroup.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.0000186);
  saturnRing.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.001);
  saturnGroup.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.00001);
  uranusGroup.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.000009);
  uranusRing.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.0005);
  neptuneGroup.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.0000076479);
  plutoGroup.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.00000248);
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
