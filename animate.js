import * as THREE from 'three';

// constants
const EARTH_FREQUENCY = 0.01;
const MERCURY_FREQUENCY = 0.24 * EARTH_FREQUENCY;
const VENUS_FREQUENCY = 0.6152 * EARTH_FREQUENCY;
const MARS_FREQUENCY = 1.88 * EARTH_FREQUENCY;
const JUPITER_FREQUENCY = 0.084 * EARTH_FREQUENCY;
const SATURN_FREQUENCY = 0.033 * EARTH_FREQUENCY;
const URANUS_FREQUENCY = 0.0119 * EARTH_FREQUENCY;
const NEPTUNE_FREQUENCY = 0.006 * EARTH_FREQUENCY;

const MERCURY_POSITION = 23;
const VENUS_POSITION = 1.2 * MERCURY_POSITION;
const EARTH_POSITION = 1.2 * VENUS_POSITION;
const MARS_POSITION = 1.2 * EARTH_POSITION;
const JUPITER_POSITION = 1.4 * MARS_POSITION;
const SATURN_POSITION = 1.7 * JUPITER_POSITION;
const URANUS_POSITION = 1.3 * SATURN_POSITION;
const NEPTUNE_POSITION = 1.1 * URANUS_POSITION;

export function animate(scene, camera, renderer, controls, cameraControl) {
    if (!controls.Pause) {
        // Translating Mercury
        let mercuryMesh = scene.getObjectByName('Mercury');
        if (mercuryMesh) animateMercury(mercuryMesh);

        // animating Venus
        let venusMesh = scene.getObjectByName('Venus');
        if (venusMesh) animateVenus(venusMesh);

        // animating Earth
        let earthMesh = scene.getObjectByName('Earth');
        if (earthMesh) animateEarth(earthMesh);

        // animating Mars
        let marsMesh = scene.getObjectByName('Mars');
        if (marsMesh) animateMars(marsMesh);

        // animating Jupiter
        let jupiterMesh = scene.getObjectByName('Jupiter');
        if (jupiterMesh) animateJupiter(jupiterMesh);

        // animating Saturn
        let saturnMesh = scene.getObjectByName('Saturn');
        if (saturnMesh) animateSaturn(saturnMesh);

        // animating Uranus
        let uranusMesh = scene.getObjectByName('Uranus');
        if (uranusMesh) animateUranus(uranusMesh);

        // animating Neptune
        let neptuneMesh = scene.getObjectByName('Neptune');
        if (neptuneMesh) animateNeptune(neptuneMesh);
    }

    renderer.render(scene, camera);
    requestAnimationFrame(() => {
        animate(scene, camera, renderer, controls, cameraControl);
    });
}

function animateMercury(mercuryMesh) {
    let angle = Math.atan2(mercuryMesh.position.z, mercuryMesh.position.x);

    angle -= MERCURY_FREQUENCY;
    mercuryMesh.position.set(Math.cos(angle) * MERCURY_POSITION, 0, Math.sin(angle) * MERCURY_POSITION);

    mercuryMesh.updateMatrix();
}

function animateVenus(venusMesh) {
    let angle = Math.atan2(venusMesh.position.z, venusMesh.position.x);

    angle -= VENUS_FREQUENCY;
    venusMesh.position.set(Math.cos(angle) * VENUS_POSITION, 0, Math.sin(angle) * VENUS_POSITION);

    venusMesh.updateMatrix();
}

function animateEarth(earthMesh) {
    let angle = Math.atan2(earthMesh.position.z, earthMesh.position.x);

    angle -= EARTH_FREQUENCY;
    earthMesh.position.set(Math.cos(angle) * EARTH_POSITION, 0, Math.sin(angle) * EARTH_POSITION);

    earthMesh.updateMatrix();

    // rotating clouds
    let cloudsMesh = earthMesh.getObjectByName('Clouds');
    if (cloudsMesh) {
        cloudsMesh.rotation.y += 0.001;
        cloudsMesh.updateMatrix();
    }
}

function animateMars(marsMesh) {
    let angle = Math.atan2(marsMesh.position.z, marsMesh.position.x);

    angle -= MARS_FREQUENCY;
    marsMesh.position.set(Math.cos(angle) * MARS_POSITION, 0, Math.sin(angle) * MARS_POSITION);

    marsMesh.updateMatrix();
}

function animateJupiter(jupiterMesh) {
    let angle = Math.atan2(jupiterMesh.position.z, jupiterMesh.position.x);

    angle -= JUPITER_FREQUENCY;
    jupiterMesh.position.set(Math.cos(angle) * JUPITER_POSITION, 0, Math.sin(angle) * JUPITER_POSITION);

    jupiterMesh.updateMatrix();
}

function animateSaturn(saturnMesh) {
    let angle = Math.atan2(saturnMesh.position.z, saturnMesh.position.x);

    angle -= SATURN_FREQUENCY;
    saturnMesh.position.set(Math.cos(angle) * SATURN_POSITION, 0, Math.sin(angle) * SATURN_POSITION);

    saturnMesh.updateMatrix();
}

function animateUranus(uranusMesh) {
    let angle = Math.atan2(uranusMesh.position.z, uranusMesh.position.x);

    angle -= URANUS_FREQUENCY;
    uranusMesh.position.set(Math.cos(angle) * URANUS_POSITION, 0, Math.sin(angle) * URANUS_POSITION);

    uranusMesh.updateMatrix();
}

function animateNeptune(neptuneMesh) {
    let angle = Math.atan2(neptuneMesh.position.z, neptuneMesh.position.x);

    angle -= NEPTUNE_FREQUENCY;
    neptuneMesh.position.set(Math.cos(angle) * NEPTUNE_POSITION, 0, Math.sin(angle) * NEPTUNE_POSITION);

    neptuneMesh.updateMatrix();
}